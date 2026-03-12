import 'server-only';

import { createSpotifyAdminApiClient } from './client';

type SpotifyPlaylist = {
  id: string;
  name: string;
  public: boolean | null;
  owner: {
    id: string;
  };
};

type SpotifyPlaylistPage = {
  items: SpotifyPlaylist[];
  next: string | null;
};

type SpotifyRequest = <T>(input: string, init?: RequestInit) => Promise<T>;

export type PublishEimerTunesReport = {
  scanned: number;
  matched: number;
  madePublic: number;
  alreadyPublic: number;
  skippedNotOwned: number;
};

const fetchOwnPlaylists = async (request: SpotifyRequest) => {
  const playlists: SpotifyPlaylist[] = [];
  let nextUrl: string | null = 'https://api.spotify.com/v1/me/playlists?limit=50';

  while (nextUrl) {
    const page: SpotifyPlaylistPage = await request(nextUrl);
    playlists.push(...page.items);
    nextUrl = page.next;
  }

  return playlists;
};

export const publishEimerTunesPlaylists = async (): Promise<PublishEimerTunesReport> => {
  const client = await createSpotifyAdminApiClient();

  if (!client) {
    throw new Error('No Spotify admin token found. Login via /admin first.');
  }

  const playlists = await fetchOwnPlaylists(client.request);

  let matched = 0;
  let madePublic = 0;
  let alreadyPublic = 0;
  let skippedNotOwned = 0;

  for (const playlist of playlists) {
    if (!playlist.name.toLowerCase().includes('eimertunes')) {
      continue;
    }

    matched += 1;

    if (playlist.owner.id !== client.accountId) {
      skippedNotOwned += 1;
      continue;
    }

    if (playlist.public) {
      alreadyPublic += 1;
      continue;
    }

    await client.request<void>(`https://api.spotify.com/v1/playlists/${playlist.id}`, {
      method: 'PUT',
      body: JSON.stringify({ public: true }),
    });

    madePublic += 1;
  }

  return {
    scanned: playlists.length,
    matched,
    madePublic,
    alreadyPublic,
    skippedNotOwned,
  };
};
