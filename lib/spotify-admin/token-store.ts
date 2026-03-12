import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import { decryptJson, encryptJson } from './crypto';

export type SpotifyStoredToken = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  accountId: string;
  scope: string;
  tokenType: string;
  updatedAt: number;
};

const ensureParentDir = async (filePath: string) => {
  const parentDir = path.dirname(filePath);
  await fs.mkdir(parentDir, { recursive: true });
};

export const readEncryptedSpotifyToken = async (
  filePath: string,
  encryptionSecret: string,
): Promise<SpotifyStoredToken | null> => {
  try {
    const encryptedContent = await fs.readFile(filePath, 'utf8');
    return decryptJson<SpotifyStoredToken>(encryptedContent, encryptionSecret);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }

    throw error;
  }
};

export const writeEncryptedSpotifyToken = async (
  filePath: string,
  encryptionSecret: string,
  token: SpotifyStoredToken,
) => {
  await ensureParentDir(filePath);
  const encryptedContent = encryptJson(token, encryptionSecret);
  await fs.writeFile(filePath, encryptedContent, { encoding: 'utf8', mode: 0o600 });
};
