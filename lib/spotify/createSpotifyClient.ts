import 'server-only';

import { getSpotifyClientCredentials } from '../spotify-admin/config';

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

export const createSpotifyClient = async () => {
  const credentials = getSpotifyClientCredentials();

  if (!credentials) {
    return null;
  }

  const auth = Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`, 'utf8').toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 60 * 30 },
  } as NextFetchInit);

  if (!response.ok) {
    console.error(
      `Failed to authenticate with Spotify (${response.status} ${response.statusText}). Rendering without playlists.`,
    );
    return null;
  }

  const data = (await response.json()) as { access_token: string };

  if (!data.access_token) {
    console.error('Spotify auth response did not include an access token. Rendering without playlists.');
    return null;
  }

  return {
    accessToken: data.access_token,
  };
};

export type SpotifyClient = NonNullable<Awaited<ReturnType<typeof createSpotifyClient>>>;
