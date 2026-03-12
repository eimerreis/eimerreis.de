import 'server-only';

import { randomToken, signValue, verifySignedValue } from './crypto';

type SpotifyAdminSession = {
  accountId: string;
  issuedAt: number;
};

const encodeSession = (session: SpotifyAdminSession) =>
  Buffer.from(JSON.stringify(session), 'utf8').toString('base64url');

const decodeSession = (value: string): SpotifyAdminSession | null => {
  try {
    const parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as SpotifyAdminSession;

    if (!parsed || typeof parsed.accountId !== 'string' || typeof parsed.issuedAt !== 'number') {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const createSpotifySessionCookieValue = (session: SpotifyAdminSession, secret: string) =>
  signValue(encodeSession(session), secret);

export const readSpotifySessionCookieValue = (value: string, secret: string) => {
  const unsignedValue = verifySignedValue(value, secret);

  if (!unsignedValue) {
    return null;
  }

  return decodeSession(unsignedValue);
};

export const createSpotifyOAuthStateCookieValue = (secret: string) => {
  const state = randomToken(24);
  const signedState = signValue(state, secret);

  return {
    state,
    signedState,
  };
};

export const verifySpotifyOAuthState = (signedState: string | undefined, expectedState: string, secret: string) => {
  if (!signedState) {
    return false;
  }

  const unsignedValue = verifySignedValue(signedState, secret);

  if (!unsignedValue) {
    return false;
  }

  return unsignedValue === expectedState;
};
