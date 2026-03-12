import 'server-only';

import { siteConfig } from '../site-config';

const DEFAULT_ACCOUNT_ID = 'eimerreis';
const DEFAULT_TOKEN_KEY = 'spotify:admin:token';
const SPOTIFY_ADMIN_SCOPES = ['playlist-read-private', 'playlist-modify-private', 'playlist-modify-public'];

export const SPOTIFY_ADMIN_SESSION_COOKIE_NAME = 'spotify-admin-session';
export const SPOTIFY_ADMIN_OAUTH_STATE_COOKIE_NAME = 'spotify-admin-oauth-state';
export const SPOTIFY_ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const getSpotifyClientCredentials = () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID ?? process.env.CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? process.env.CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  return { clientId, clientSecret };
};

export const getSpotifyAdminAccountId = () =>
  process.env.SPOTIFY_ADMIN_ACCOUNT_ID ?? process.env.SPOTIFY_USER_ID ?? DEFAULT_ACCOUNT_ID;

export const getSpotifyOAuthScopes = () => [...SPOTIFY_ADMIN_SCOPES];

export const getSpotifyOAuthRedirectUri = (origin?: string) => {
  if (process.env.SPOTIFY_ADMIN_REDIRECT_URI) {
    return process.env.SPOTIFY_ADMIN_REDIRECT_URI;
  }

  if (origin) {
    return `${origin}/api/admin/spotify/callback`;
  }

  return `${siteConfig.url}/api/admin/spotify/callback`;
};

export const getSpotifyAdminTokenKey = () => process.env.SPOTIFY_ADMIN_TOKEN_KEY ?? DEFAULT_TOKEN_KEY;

export const getSpotifyTokenEncryptionSecret = () => process.env.SPOTIFY_ADMIN_TOKEN_SECRET ?? null;

export const getSpotifySessionSecret = () =>
  process.env.SPOTIFY_ADMIN_SESSION_SECRET ?? getSpotifyTokenEncryptionSecret();

export const getSpotifyCronSecret = () => process.env.SPOTIFY_CRON_SECRET ?? null;

export const getSpotifyAdminSetupIssues = () => {
  const issues: string[] = [];

  if (!getSpotifyClientCredentials()) {
    issues.push('Missing SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.');
  }

  if (!getSpotifyTokenEncryptionSecret()) {
    issues.push('Missing SPOTIFY_ADMIN_TOKEN_SECRET for encrypted token storage.');
  }

  if (!process.env.REDIS_URL) {
    issues.push('Missing REDIS_URL for Redis token storage.');
  }

  return issues;
};
