import { afterEach, describe, expect, it, vi } from 'vitest';
import { getStoredSpotifyToken } from '../spotify-admin/client';
import { fetchAllPlaylists } from './fetchAllPlaylists';

vi.mock('../spotify-admin/client', () => ({
  getStoredSpotifyToken: vi.fn(),
}));

const originalFetch = global.fetch;
const mockedGetStoredSpotifyToken = vi.mocked(getStoredSpotifyToken);

describe('fetchAllPlaylists', () => {
  afterEach(() => {
    global.fetch = originalFetch;
    mockedGetStoredSpotifyToken.mockReset();
  });

  it('filters playlists to EimerTunes entries', async () => {
    mockedGetStoredSpotifyToken.mockResolvedValue({
      accessToken: 'admin-token',
      refreshToken: 'refresh',
      expiresAt: Date.now() + 60_000,
      accountId: 'eimerreis',
      scope: 'playlist-read-private',
      tokenType: 'Bearer',
      updatedAt: Date.now(),
    });

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

    const playlists = await fetchAllPlaylists();

    expect(playlists).toHaveLength(1);
    expect(playlists[0].name).toBe('EimerTunes 01');
  });

  it('returns an empty array when Spotify playlists request fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    mockedGetStoredSpotifyToken.mockResolvedValue({
      accessToken: 'admin-token',
      refreshToken: 'refresh',
      expiresAt: Date.now() + 60_000,
      accountId: 'eimerreis',
      scope: 'playlist-read-private',
      tokenType: 'Bearer',
      updatedAt: Date.now(),
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response) as unknown as typeof fetch;

    const playlists = await fetchAllPlaylists();

    expect(playlists).toEqual([]);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore();
  });

  it('uses stored admin token to load private playlists', async () => {
    mockedGetStoredSpotifyToken.mockResolvedValue({
      accessToken: 'admin-token',
      refreshToken: 'refresh',
      expiresAt: Date.now() + 60_000,
      accountId: 'eimerreis',
      scope: 'playlist-read-private',
      tokenType: 'Bearer',
      updatedAt: Date.now(),
    });

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        total: 1,
        next: null,
        items: [
          {
            id: 'march-2026',
            name: 'EimerTunes March 2026',
            description: 'desc',
            external_urls: { spotify: 'https://open.spotify.com/playlist/march-2026' },
            images: [{ url: 'https://i.scdn.co/image/march-2026' }],
            tracks: { total: 15 },
          },
        ],
      }),
    } as Response) as unknown as typeof fetch;

    const playlists = await fetchAllPlaylists();

    expect(playlists).toHaveLength(1);
    expect(playlists[0].name).toBe('EimerTunes March 2026');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.spotify.com/v1/me/playlists?limit=50'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer admin-token',
        }),
      }),
    );
  });

  it('returns empty when no stored admin token exists', async () => {
    mockedGetStoredSpotifyToken.mockResolvedValue(null);
    global.fetch = vi.fn() as unknown as typeof fetch;

    const playlists = await fetchAllPlaylists();

    expect(playlists).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
