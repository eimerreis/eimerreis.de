import 'server-only';

const getSpotifyCredentials = () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID ?? process.env.CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? process.env.CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  return { clientId, clientSecret };
};

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

export const createSpotifyClient = async () => {
  const credentials = getSpotifyCredentials();

  if (!credentials) {
    return null;
  }

  const auth = Buffer.from(
    `${credentials.clientId}:${credentials.clientSecret}`,
    'utf8'
  ).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 60 * 30 }
  } as NextFetchInit);

  if (!response.ok) {
    throw new Error('Failed to authenticate with Spotify');
  }

  const data = (await response.json()) as { access_token: string };
  return {
    accessToken: data.access_token
  };
};

export type SpotifyClient = NonNullable<Awaited<ReturnType<typeof createSpotifyClient>>>;
