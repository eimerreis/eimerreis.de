import Link from 'next/link';

import { ClayAvatar } from '@/components/site/clay-avatar';
import { PlaylistCard } from '@/components/site/playlist-card';
import { getPosts } from '@/lib/notion/getDatabase';
import { siteConfig } from '@/lib/site-config';
import { getCachedPlaylists } from '@/lib/spotify/getCachedPlaylists';

export const revalidate = 1800;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));

export default async function HomePage() {
  const [posts, playlists] = await Promise.all([getPosts(), getCachedPlaylists()]);
  const recentPosts = posts.slice(0, 6);

  const playlistPreview = playlists.slice(0, 3);
  const categorySet = new Set<string>();

  for (const post of posts) {
    for (const topic of post.topics) {
      categorySet.add(topic);
    }
  }

  return (
    <div className="pb-8">
      <section className="relative pb-20 pt-2 md:pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-2 h-[20rem] overflow-hidden reveal-soft md:h-[27rem]">
          <div className="avatar-shell avatar-drift absolute bottom-[2rem] right-4 z-10 w-[18rem] md:bottom-[-3rem]">
            <ClayAvatar />
            <div className="avatar-easteregg pointer-events-none absolute -right-5 top-6 rounded-full border border-accentAlt/40 bg-paper/85 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-accentAlt">
              psst...
            </div>
          </div>
        </div>

        <div className="relative z-20 grid gap-6 md:grid-cols-[1.06fr_0.94fr] md:items-end">
          <div className="surface reveal rounded-[2rem] px-6 py-8 md:px-9 md:py-11">
            <p className="eyebrow">Freshly rebuilt</p>
            <h1 className="mt-4 max-w-3xl font-display text-[2.7rem] leading-[0.98] tracking-[-0.03em] text-ink md:text-[4.5rem]">
              Hi, I&apos;m Moritz. I build <span className="rainbow-word">playful interfaces</span> and write about how
              the web feels.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted md:text-lg">{siteConfig.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/writing"
                className="rounded-full border-2 border-accent/50 bg-accent/[0.12] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent/[0.18] active:scale-95"
              >
                Read writing
              </Link>
              <Link
                href="/playlists"
                className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accentAlt/[0.45] hover:text-accentAlt active:scale-95"
              >
                Browse playlists
              </Link>
            </div>
          </div>

          <aside className="surface !bg-[rgb(var(--color-paper-soft))] reveal delay-2 rounded-[1.8rem] px-6 py-7 md:mb-8 md:ml-auto md:max-w-[22rem]">
            <p className="eyebrow">Now playing</p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight">
              Currently discovering the world of agentic coding
            </h2>
            <p className="mt-4 text-sm text-muted">
              Did not expect such a paradigm shift in programming to come, but here we are. Excited to see where this
              goes.
            </p>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 pb-16 reveal delay-2 md:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-1">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tighter md:text-4xl">Recent writing</h2>
            <Link href="/writing" className="subtle-link text-xs uppercase tracking-[0.14em]">
              All posts
            </Link>
          </div>
          <div className="stagger-children space-y-3">
            {recentPosts.slice(0, 4).map((post) => (
              <article key={post.id} className="surface group rounded-2xl px-4 py-3 md:px-5 md:py-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{formatDate(post.publishedAt)}</p>
                <h3 className="mt-2 font-display text-[1.65rem] tracking-tight text-ink transition group-hover:text-accent">
                  <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                </h3>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tighter md:text-4xl">Playlist picks</h2>
            <Link href="/playlists" className="subtle-link text-xs uppercase tracking-[0.14em]">
              Full list
            </Link>
          </div>
          <div className="stagger-children space-y-3">
            {playlistPreview.length > 0 ? (
              playlistPreview.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />)
            ) : (
              <div className="surface rounded-3xl p-6 text-sm text-muted">Playlists are not available right now.</div>
            )}
          </div>
        </div>
      </section>

      <section className="reveal delay-3 pb-2">
        <div className="surface rounded-[2rem] border-accent/[0.45] bg-gradient-to-r from-accent/[0.12] via-paperSoft to-accentAlt/[0.12] px-6 py-8 md:px-8 md:py-9">
          <p className="eyebrow">No newsletter, just links</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
            Follow along where I actually post stuff.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            I usually share new side projects, and monthly music picks on socials. Pick your lane.
          </p>
          <div className="stagger-children mt-6 flex flex-wrap gap-3">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-line bg-paper/70 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-ink transition hover:border-accent/[0.45] hover:text-accent active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
