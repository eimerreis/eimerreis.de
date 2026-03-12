import 'server-only';

import { cookies } from 'next/headers';

import { createSpotifySessionCookieValue, readSpotifySessionCookieValue } from './auth-cookies';
import {
  getSpotifyAdminAccountId,
  getSpotifySessionSecret,
  SPOTIFY_ADMIN_OAUTH_STATE_COOKIE_NAME,
  SPOTIFY_ADMIN_SESSION_COOKIE_NAME,
  SPOTIFY_ADMIN_SESSION_MAX_AGE_SECONDS,
} from './config';

const isSecureCookie = process.env.NODE_ENV === 'production';
const OAUTH_STATE_MAX_AGE_SECONDS = 60 * 10;

export const createSpotifySessionCookie = (accountId: string) => {
  const secret = getSpotifySessionSecret();

  if (!secret) {
    throw new Error('Missing SPOTIFY_ADMIN_SESSION_SECRET or SPOTIFY_ADMIN_TOKEN_SECRET.');
  }

  return {
    name: SPOTIFY_ADMIN_SESSION_COOKIE_NAME,
    value: createSpotifySessionCookieValue(
      {
        accountId,
        issuedAt: Date.now(),
      },
      secret,
    ),
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SPOTIFY_ADMIN_SESSION_MAX_AGE_SECONDS,
  };
};

export const clearSpotifySessionCookie = () => ({
  name: SPOTIFY_ADMIN_SESSION_COOKIE_NAME,
  value: '',
  httpOnly: true,
  secure: isSecureCookie,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 0,
});

export const createSpotifyOAuthStateCookie = (signedState: string) => ({
  name: SPOTIFY_ADMIN_OAUTH_STATE_COOKIE_NAME,
  value: signedState,
  httpOnly: true,
  secure: isSecureCookie,
  sameSite: 'lax' as const,
  path: '/api/admin/spotify/callback',
  maxAge: OAUTH_STATE_MAX_AGE_SECONDS,
});

export const clearSpotifyOAuthStateCookie = () => ({
  name: SPOTIFY_ADMIN_OAUTH_STATE_COOKIE_NAME,
  value: '',
  httpOnly: true,
  secure: isSecureCookie,
  sameSite: 'lax' as const,
  path: '/api/admin/spotify/callback',
  maxAge: 0,
});

export const getSpotifyAdminSession = async () => {
  const secret = getSpotifySessionSecret();

  if (!secret) {
    return null;
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(SPOTIFY_ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!cookie) {
    return null;
  }

  const session = readSpotifySessionCookieValue(cookie, secret);

  if (!session) {
    return null;
  }

  if (session.accountId !== getSpotifyAdminAccountId()) {
    return null;
  }

  if (Date.now() - session.issuedAt > SPOTIFY_ADMIN_SESSION_MAX_AGE_SECONDS * 1000) {
    return null;
  }

  return session;
};
