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

  it('returns null when Spotify authentication fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized'
    } as Response);

    const client = await createSpotifyClient();

    expect(client).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  it('returns null when Spotify credentials are missing', async () => {
    delete process.env.SPOTIFY_CLIENT_ID;
    delete process.env.SPOTIFY_CLIENT_SECRET;
    delete process.env.CLIENT_ID;
    delete process.env.CLIENT_SECRET;

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: 'token' })
    } as Response);
    global.fetch = fetchMock as unknown as typeof fetch;

    const client = await createSpotifyClient();

    expect(client).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
