import { PlaylistCard } from '@/components/site/playlist-card';
import { createSpotifyClient } from '@/lib/spotify/createSpotifyClient';
import { fetchAllPlaylists } from '@/lib/spotify/fetchAllPlaylists';

export const revalidate = 3600;

export default async function PlaylistsPage() {
  const playlists = await createSpotifyClient().then(fetchAllPlaylists);

  return (
    <div className="pb-12 pt-2">
      <header className="reveal pb-12">
        <p className="eyebrow">Spotify</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-[-0.03em] md:text-7xl">
          Soundtrack archive with <span className="rainbow-word">monthly moods</span>.
        </h1>
        <p className="mt-5 max-w-3xl text-muted md:text-lg">
          Monthly playlists with rediscoveries, new favorites, and songs that escaped the filter
          bubble.
        </p>
      </header>

      {playlists.length > 0 ? (
        <div className="stagger-children grid gap-4 reveal delay-1 md:grid-cols-2">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div className="surface rounded-3xl p-6 text-sm text-muted">
          No playlists available right now. Check Spotify credentials or playlist naming.
        </div>
      )}
    </div>
  );
}
