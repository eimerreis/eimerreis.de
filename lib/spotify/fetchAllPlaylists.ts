import 'server-only';

import type { Playlist } from '../notion/types';
import { getStoredSpotifyToken } from '../spotify-admin/client';

type SpotifyPlaylistResponse = {
  next: string | null;
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

const PLAYLIST_PAGE_SIZE = 50;

const fetchPlaylistsPage = async (url: string, accessToken: string): Promise<SpotifyPlaylistResponse> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 60 * 60 },
  } as NextFetchInit);

  if (!response.ok) {
    throw new Error(`Failed to fetch Spotify playlists (${response.status} ${response.statusText})`);
  }

  return response.json();
};

const mapPlaylist = (playlist: SpotifyPlaylistResponse['items'][number]): Playlist => ({
  id: playlist.id,
  name: playlist.name,
  description: playlist.description.replace(/<[^>]+>/g, '').trim(),
  href: playlist.external_urls.spotify,
  image: playlist.images[0]?.url ?? null,
  totalTracks: playlist.tracks.total,
});

export const fetchAllPlaylists = async (): Promise<Playlist[]> => {
  try {
    const storedToken = await getStoredSpotifyToken();

    if (!storedToken) {
      return [];
    }

    const items: SpotifyPlaylistResponse['items'] = [];
    let nextUrl: string | null = `https://api.spotify.com/v1/me/playlists?limit=${PLAYLIST_PAGE_SIZE}`;

    while (nextUrl) {
      const page = await fetchPlaylistsPage(nextUrl, storedToken.accessToken);
      items.push(...page.items);
      nextUrl = page.next;
    }

    return items.map(mapPlaylist).filter((playlist) => playlist.name.toLowerCase().includes('eimertunes'));
  } catch (error) {
    console.error('Failed to load Spotify playlists. Rendering without playlists.', error);
    return [];
  }
};
