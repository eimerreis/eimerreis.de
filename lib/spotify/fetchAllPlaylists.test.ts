import { fetchAllPlaylists } from './fetchAllPlaylists';
import { afterEach, describe, expect, it, vi } from 'vitest';

const originalFetch = global.fetch;

describe('fetchAllPlaylists', () => {
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('filters playlists to EimerTunes entries', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        total: 2,
        items: [
          {
            id: '1',
            name: 'EimerTunes 01',
            description: 'desc',
            external_urls: { spotify: 'https://open.spotify.com/playlist/1' },
            images: [{ url: 'https://i.scdn.co/image/1' }],
            tracks: { total: 12 },
          },
          {
            id: '2',
            name: 'Other Playlist',
            description: 'desc',
            external_urls: { spotify: 'https://open.spotify.com/playlist/2' },
            images: [{ url: 'https://i.scdn.co/image/2' }],
            tracks: { total: 20 },
          },
        ],
      }),
    } as Response) as unknown as typeof fetch;

    const playlists = await fetchAllPlaylists({ accessToken: 'token' });

    expect(playlists).toHaveLength(1);
    expect(playlists[0].name).toBe('EimerTunes 01');
  });

  it('returns an empty array when Spotify playlists request fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response) as unknown as typeof fetch;

    const playlists = await fetchAllPlaylists({ accessToken: 'token' });

    expect(playlists).toEqual([]);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore();
  });
});
