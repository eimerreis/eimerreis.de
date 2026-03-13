import { PlaylistCard } from '@/components/site/playlist-card';
import { getCachedPlaylists } from '@/lib/spotify/getCachedPlaylists';

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function PlaylistsPage() {
  const playlists = await getCachedPlaylists();

  return (
    <div className="pb-12 pt-2">
      <header className="reveal pb-12">
        <p className="eyebrow">Spotify</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-[-0.03em] md:text-7xl">
          Soundtrack archive with <span className="rainbow-word">monthly moods</span>.
        </h1>
        <p className="mt-5 max-w-3xl text-muted md:text-lg">
          Monthly playlists with rediscoveries, new favorites, and songs that escaped the filter bubble.
        </p>
      </header>

      {playlists.length > 0 ? (
        <div className="stagger-children grid gap-4 reveal delay-1 md:grid-cols-2">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <section className="surface rounded-[1.9rem] border-accentAlt/[0.45] bg-gradient-to-r from-accentAlt/[0.1] via-paperSoft to-highlight/[0.12] p-6 md:p-7">
          <p className="eyebrow">Quiet month</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">No published playlists yet.</h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            As soon as Spotify sync completes, monthly moods appear here.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">
            Quick check: credentials, account ownership, and naming convention.
          </p>
        </section>
      )}
    </div>
  );
}
