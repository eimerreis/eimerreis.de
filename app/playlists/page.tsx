import { PlaylistCard } from '@/components/site/playlist-card';
import { getCachedPlaylists } from '@/lib/spotify/getCachedPlaylists';

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function PlaylistsPage() {
  const playlists = await getCachedPlaylists();

  return (
    <div className="pb-24 pt-12 relative z-10">
      <header className="reveal pb-16 mb-16 border-b border-line">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] w-12 bg-accentAlt" />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">Spotify</p>
        </div>

        <h1 className="max-w-4xl font-display text-[3.5rem] leading-[0.9] tracking-[-0.02em] text-ink md:text-[5rem] uppercase font-bold">
          Soundtrack archive with <span className="text-accentAlt">monthly moods</span>.
        </h1>

        <p className="mt-8 max-w-2xl text-lg font-medium text-muted/90 md:text-xl leading-relaxed">
          Monthly playlists with rediscoveries, new favorites, and songs that escaped the filter bubble.
        </p>
      </header>

      {playlists.length > 0 ? (
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-12 reveal delay-1">
          <div className="md:col-span-4 flex flex-col items-start sticky top-8 h-fit">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-2">Catalogue</p>
            <h2 className="font-display text-5xl font-light tracking-tighter uppercase md:text-6xl mb-6">
              All Mixes
              <span className="block font-bold text-accentAlt">{playlists.length.toString().padStart(2, '0')}</span>
            </h2>
          </div>

          <div className="md:col-span-8 stagger-children grid gap-6 sm:grid-cols-2">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="h-full">
                <PlaylistCard playlist={playlist} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <section className="border border-line bg-paperSoft p-8 md:p-12 max-w-2xl reveal delay-1">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-4">Quiet month</p>
          <h2 className="font-display text-3xl font-light uppercase tracking-tight md:text-4xl mb-6">
            No published playlists yet.
          </h2>
          <p className="text-muted/80 font-medium mb-6">
            As soon as Spotify sync completes, monthly moods appear here.
          </p>
          <p className="font-display text-[10px] uppercase tracking-widest text-muted bg-paper px-3 py-2 border border-line inline-block">
            System check: credentials and ownership
          </p>
        </section>
      )}
    </div>
  );
}
