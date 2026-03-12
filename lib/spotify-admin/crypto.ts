import 'server-only';

import crypto from 'node:crypto';

const ENCRYPTION_VERSION = 'v1';
const KEY_LENGTH = 32;
const IV_LENGTH = 12;

const toBase64Url = (value: Buffer) => value.toString('base64url');
const fromBase64Url = (value: string) => Buffer.from(value, 'base64url');

const deriveKey = (secret: string, salt: Buffer) => crypto.scryptSync(secret, salt, KEY_LENGTH);

export const randomToken = (length = 32) => toBase64Url(crypto.randomBytes(length));

export const encryptJson = (payload: unknown, secret: string) => {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey(secret, salt);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const plaintext = Buffer.from(JSON.stringify(payload), 'utf8');
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return [ENCRYPTION_VERSION, toBase64Url(salt), toBase64Url(iv), toBase64Url(authTag), toBase64Url(ciphertext)].join(
    '.',
  );
};

export const decryptJson = <T>(encryptedValue: string, secret: string): T => {
  const [version, salt, iv, authTag, ciphertext] = encryptedValue.split('.');

  if (version !== ENCRYPTION_VERSION || !salt || !iv || !authTag || !ciphertext) {
    throw new Error('Invalid encrypted payload format.');
  }

  const key = deriveKey(secret, fromBase64Url(salt));
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, fromBase64Url(iv));
  decipher.setAuthTag(fromBase64Url(authTag));
  const plaintext = Buffer.concat([decipher.update(fromBase64Url(ciphertext)), decipher.final()]);

  return JSON.parse(plaintext.toString('utf8')) as T;
};

export const signValue = (value: string, secret: string) => {
  const signature = crypto.createHmac('sha256', secret).update(value).digest('base64url');
  return `${value}.${signature}`;
};

export const verifySignedValue = (signedValue: string, secret: string) => {
  const lastDotIndex = signedValue.lastIndexOf('.');

  if (lastDotIndex <= 0) {
    return null;
  }

  const value = signedValue.slice(0, lastDotIndex);
  const signature = signedValue.slice(lastDotIndex + 1);
  const expectedSignature = crypto.createHmac('sha256', secret).update(value).digest('base64url');
  const signatureBuffer = Buffer.from(signature, 'utf8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  return value;
};
