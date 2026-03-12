import 'server-only';

import { getSpotifyClientCredentials, getSpotifyOAuthRedirectUri, getSpotifyOAuthScopes } from './config';

type SpotifyOAuthTokenResponse = {
  access_token: string;
  token_type?: string;
  scope?: string;
  expires_in: number;
  refresh_token?: string;
};

type SpotifyProfileResponse = {
  id: string;
};

const createAuthHeader = (clientId: string, clientSecret: string) => {
  const auth = Buffer.from(`${clientId}:${clientSecret}`, 'utf8').toString('base64');
  return `Basic ${auth}`;
};

const getRequiredCredentials = () => {
  const credentials = getSpotifyClientCredentials();

  if (!credentials) {
    throw new Error('Spotify admin is not configured. Missing client credentials.');
  }

  return credentials;
};

export const createSpotifyOAuthAuthorizeUrl = (state: string, origin?: string) => {
  const credentials = getRequiredCredentials();
  const redirectUri = getSpotifyOAuthRedirectUri(origin);
  const scope = getSpotifyOAuthScopes().join(' ');

  const search = new URLSearchParams({
    client_id: credentials.clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope,
    state,
    show_dialog: 'true',
  });

  return `https://accounts.spotify.com/authorize?${search.toString()}`;
};

export const exchangeAuthorizationCode = async (code: string, origin?: string): Promise<SpotifyOAuthTokenResponse> => {
  const credentials = getRequiredCredentials();
  const redirectUri = getSpotifyOAuthRedirectUri(origin);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: createAuthHeader(credentials.clientId, credentials.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Spotify OAuth exchange failed (${response.status} ${response.statusText}).`);
  }

  return (await response.json()) as SpotifyOAuthTokenResponse;
};

export const refreshAccessToken = async (refreshToken: string): Promise<SpotifyOAuthTokenResponse> => {
  const credentials = getRequiredCredentials();

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: createAuthHeader(credentials.clientId, credentials.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Spotify token refresh failed (${response.status} ${response.statusText}).`);
  }

  return (await response.json()) as SpotifyOAuthTokenResponse;
};

export const fetchCurrentSpotifyUser = async (accessToken: string): Promise<SpotifyProfileResponse> => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to read Spotify profile (${response.status} ${response.statusText}).`);
  }

  return (await response.json()) as SpotifyProfileResponse;
};
