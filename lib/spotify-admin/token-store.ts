import 'server-only';

import { decryptJson, encryptJson } from './crypto';
import { getRedisClient } from './redis';

export type SpotifyStoredToken = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  accountId: string;
  scope: string;
  tokenType: string;
  updatedAt: number;
};

export const readEncryptedSpotifyToken = async (
  tokenKey: string,
  encryptionSecret: string,
): Promise<SpotifyStoredToken | null> => {
  const redis = await getRedisClient();
  const encryptedContent = await redis.get(tokenKey);

  if (!encryptedContent) {
    return null;
  }

  return decryptJson<SpotifyStoredToken>(encryptedContent, encryptionSecret);
};

export const writeEncryptedSpotifyToken = async (
  tokenKey: string,
  encryptionSecret: string,
  token: SpotifyStoredToken,
) => {
  const redis = await getRedisClient();
  const encryptedContent = encryptJson(token, encryptionSecret);
  await redis.set(tokenKey, encryptedContent);
};
