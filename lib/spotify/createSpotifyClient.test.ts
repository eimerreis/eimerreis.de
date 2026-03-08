import { createSpotifyClient } from './createSpotifyClient';

const originalEnv = process.env;
const originalFetch = global.fetch;

describe('createSpotifyClient', () => {
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      SPOTIFY_CLIENT_ID: 'clientId',
      SPOTIFY_CLIENT_SECRET: 'clientSecret'
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: 'token' })
    } as Response);
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it('returns access token when credentials are present', async () => {
    const client = await createSpotifyClient();
    expect(client).toEqual({ accessToken: 'token' });
  });
});
