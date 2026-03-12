import 'server-only';

import { getSpotifyAdminAccountId, getSpotifyAdminTokenFilePath, getSpotifyTokenEncryptionSecret } from './config';
import { refreshAccessToken } from './oauth';
import { readEncryptedSpotifyToken, type SpotifyStoredToken, writeEncryptedSpotifyToken } from './token-store';

const EXPIRY_GRACE_SECONDS = 120;

const getEncryptionSecret = () => {
  const secret = getSpotifyTokenEncryptionSecret();

  if (!secret) {
    throw new Error('Spotify admin encryption secret is missing. Set SPOTIFY_ADMIN_TOKEN_SECRET.');
  }

  return secret;
};

const isTokenExpired = (token: SpotifyStoredToken) => Date.now() >= token.expiresAt - EXPIRY_GRACE_SECONDS * 1000;

const refreshStoredToken = async (token: SpotifyStoredToken, encryptionSecret: string, tokenFilePath: string) => {
  const refreshedToken = await refreshAccessToken(token.refreshToken);

  const nextToken: SpotifyStoredToken = {
    accessToken: refreshedToken.access_token,
    refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    expiresAt: Date.now() + refreshedToken.expires_in * 1000,
    accountId: token.accountId,
    scope: refreshedToken.scope ?? token.scope,
    tokenType: refreshedToken.token_type ?? token.tokenType,
    updatedAt: Date.now(),
  };

  await writeEncryptedSpotifyToken(tokenFilePath, encryptionSecret, nextToken);

  return nextToken;
};

export const getStoredSpotifyToken = async () => {
  const encryptionSecret = getEncryptionSecret();
  const tokenFilePath = getSpotifyAdminTokenFilePath();
  const token = await readEncryptedSpotifyToken(tokenFilePath, encryptionSecret);

  if (!token) {
    return null;
  }

  if (token.accountId !== getSpotifyAdminAccountId()) {
    throw new Error(`Stored Spotify token belongs to ${token.accountId}, expected ${getSpotifyAdminAccountId()}.`);
  }

  if (isTokenExpired(token)) {
    return refreshStoredToken(token, encryptionSecret, tokenFilePath);
  }

  return token;
};

export const createSpotifyAdminApiClient = async () => {
  const token = await getStoredSpotifyToken();

  if (!token) {
    return null;
  }

  const request = async <T>(input: string, init?: RequestInit): Promise<T> => {
    const headers = new Headers(init?.headers);
    headers.set('Authorization', `Bearer ${token.accessToken}`);

    if (init?.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(input, {
      ...init,
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Spotify API request failed (${response.status} ${response.statusText})`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  };

  return {
    accountId: token.accountId,
    token,
    request,
  };
};
