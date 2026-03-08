import Link from 'next/link';

import { PlaylistCard } from '@/components/site/playlist-card';
import { PostCard } from '@/components/site/post-card';
import { getFeaturedPosts, getRecentPosts } from '@/lib/notion/getDatabase';
import { createSpotifyClient } from '@/lib/spotify/createSpotifyClient';
import { fetchAllPlaylists } from '@/lib/spotify/fetchAllPlaylists';
import { siteConfig } from '@/lib/site-config';

export const revalidate = 1800;

export default async function HomePage() {
  const [featuredPosts, recentPosts, playlists] = await Promise.all([
    getFeaturedPosts(2),
    getRecentPosts(6),
    createSpotifyClient().then(fetchAllPlaylists)
  ]);

  const playlistPreview = playlists.slice(0, 2);

  return (
    <div className="pb-6">
      <section className="grid gap-6 pb-20 pt-3 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div className="surface reveal rounded-[2rem] px-6 py-8 md:px-8 md:py-11">
          <p className="eyebrow">Personal website</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
            Notes on frontend craft, internet culture, and recurring songs.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted md:mt-6 md:text-lg">{siteConfig.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/writing"
              className="rounded-full border border-accent/35 bg-accent/10 px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition hover:-translate-y-0.5 hover:bg-accent/14"
            >
              Read writing
            </Link>
            <Link
              href="/playlists"
              className="rounded-full border border-line px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent"
            >
              Browse playlists
            </Link>
          </div>
        </div>

        <aside className="surface reveal delay-1 rounded-[2rem] px-6 py-8 md:px-7 md:py-10">
          <p className="eyebrow text-muted">Current focus</p>
          <p className="mt-4 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
            Building calm interfaces with better editorial rhythm.
          </p>
          <p className="mt-5 text-sm text-muted md:text-[0.95rem]">
            This redesign keeps Notion as the publishing backend while moving the frontend to a
            custom App Router architecture.
          </p>
        </aside>
      </section>

      <section className="pb-16 reveal delay-1">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">Featured writing</h2>
          <Link href="/writing" className="subtle-link text-xs uppercase tracking-[0.14em]">
            View archive
          </Link>
        </div>
        {featuredPosts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="surface rounded-3xl p-6 text-sm text-muted">
            No published writing found. Connect your Notion database to populate this section.
          </div>
        )}
      </section>

      <section className="grid gap-6 pb-16 reveal delay-2 md:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-1">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">Recent archive</h2>
            <Link href="/writing" className="subtle-link text-xs uppercase tracking-[0.14em]">
              All posts
            </Link>
          </div>
          <div className="space-y-3">
            {recentPosts.slice(0, 4).map((post) => (
              <article
                key={post.id}
                className="surface rounded-2xl px-4 py-3 md:px-5 md:py-4 hover:-translate-y-0.5"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                  {new Intl.DateTimeFormat('en', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }).format(new Date(post.publishedAt))}
                </p>
                <h3 className="mt-2 font-display text-[1.65rem] tracking-tight text-ink">
                  <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                </h3>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">Playlist picks</h2>
            <Link href="/playlists" className="subtle-link text-xs uppercase tracking-[0.14em]">
              Full list
            </Link>
          </div>
          <div className="space-y-3">
            {playlistPreview.length > 0 ? (
              playlistPreview.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))
            ) : (
              <div className="surface rounded-3xl p-6 text-sm text-muted">
                Spotify credentials are missing, so playlist previews are hidden.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
