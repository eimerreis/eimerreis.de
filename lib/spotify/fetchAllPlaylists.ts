import 'server-only';

import type { Playlist } from '../notion/types';
import type { SpotifyClient } from './createSpotifyClient';
import { calculateRequestsNeeded } from './spotify.utils';

type SpotifyPlaylistResponse = {
  total: number;
  items: Array<{
    id: string;
    name: string;
    description: string;
    external_urls: { spotify: string };
    images: Array<{ url: string }>;
    tracks: { total: number };
  }>;
};

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

const getUserId = () => process.env.SPOTIFY_USER_ID ?? 'eimerreis';

const fetchPlaylistsPage = async (
  client: SpotifyClient,
  offset: number,
  limit: number
): Promise<SpotifyPlaylistResponse> => {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${getUserId()}/playlists?offset=${offset}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${client.accessToken}`
      },
      next: { revalidate: 60 * 60 }
    } as NextFetchInit
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Spotify playlists (${response.status} ${response.statusText})`
    );
  }

  return response.json();
};

const mapPlaylist = (playlist: SpotifyPlaylistResponse['items'][number]): Playlist => ({
  id: playlist.id,
  name: playlist.name,
  description: playlist.description.replace(/<[^>]+>/g, '').trim(),
  href: playlist.external_urls.spotify,
  image: playlist.images[0]?.url ?? null,
  totalTracks: playlist.tracks.total
});

export const fetchAllPlaylists = async (
  client: SpotifyClient | null
): Promise<Playlist[]> => {
  if (!client) {
    return [];
  }

  try {
    const pageSize = 50;
    const firstPage = await fetchPlaylistsPage(client, 0, pageSize);
    const requestCount = calculateRequestsNeeded(firstPage.total, pageSize, true);

    const remainingPages = await Promise.all(
      Array.from({ length: requestCount }, (_, index) =>
        fetchPlaylistsPage(client, (index + 1) * pageSize, pageSize)
      )
    );

    return [...firstPage.items, ...remainingPages.flatMap((page) => page.items)]
      .map(mapPlaylist)
      .filter((playlist) => playlist.name.toLowerCase().includes('eimertunes'));
  } catch (error) {
    console.error('Failed to load Spotify playlists. Rendering without playlists.', error);
    return [];
  }
};
