import 'server-only';

import { unstable_cache } from 'next/cache';

import { fetchAllPlaylists } from './fetchAllPlaylists';

const PLAYLISTS_REVALIDATE_SECONDS = 60 * 60;

export const getCachedPlaylists = unstable_cache(fetchAllPlaylists, ['spotify-playlists'], {
  revalidate: PLAYLISTS_REVALIDATE_SECONDS,
  tags: ['spotify-playlists'],
});
