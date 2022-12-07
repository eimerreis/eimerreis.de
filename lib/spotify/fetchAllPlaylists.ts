import { SpotifyClient } from './createSpotifyClient';
import { CaluclateRequestsNeeded } from './spotify.utils';

export const fetchAllPlaylists = async (
  spotifyClient: SpotifyClient,
  userId: string
) => {
  const maxItemsToFetch = 50;
  const { total: totalPlaylists, items } =
    await spotifyClient.playlists.getUserPlaylists(userId, {
      offset: 0,
      limit: maxItemsToFetch,
    });

  const missingPromises = CaluclateRequestsNeeded(
    totalPlaylists,
    maxItemsToFetch,
    true
  );
  const promises = Array.from(Array(missingPromises).keys()).map((number) => {
    return spotifyClient.playlists.getUserPlaylists(userId, {
      offset: number * maxItemsToFetch,
      limit: maxItemsToFetch,
    });
  });

  const allPlaylistResponses = await Promise.all(promises);
  return [...items, ...allPlaylistResponses.flatMap((res) => res.items)];
};
