import { SpotifyWebApi } from 'spotify-web-api-ts';

export const createSpotifyClient = async (clientId: string, clientSecret: string) => {
  const spotify = new SpotifyWebApi({ clientId, clientSecret });
  const { access_token } = await spotify.getTemporaryAppTokens();
  spotify.setAccessToken(access_token);
  return spotify;
};

export type SpotifyClient = Awaited<ReturnType<typeof createSpotifyClient>>
