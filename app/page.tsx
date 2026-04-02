import Link from 'next/link';

import { ClayAvatar } from '@/components/site/clay-avatar';
import { Marquee } from '@/components/site/marquee';
import { PlaylistCard } from '@/components/site/playlist-card';
import { ProjectCard } from '@/components/site/project-card';
import { getPosts } from '@/lib/notion/getDatabase';
import { getFeaturedProjects } from '@/lib/projects';
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
  const [posts, playlists, featuredProjects] = await Promise.all([
    getPosts(),
    getCachedPlaylists(),
    getFeaturedProjects(3),
  ]);
  const recentPosts = posts.slice(0, 6);

  const playlistPreview = playlists.slice(0, 3);
  const categorySet = new Set<string>();

  for (const post of posts) {
    for (const topic of post.topics) {
      categorySet.add(topic);
    }
  }

  return (
    <div className="pb-16 relative">
      <section className="relative z-10 pb-24 pt-12 md:pb-32 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="reveal col-span-1 md:col-span-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-accent" />
              <p className="font-display text-sm font-bold uppercase tracking-widest text-accent">
                {new Date().getFullYear()} Edition
              </p>
            </div>

            <h1 className="font-display text-[4rem] leading-[0.9] tracking-[-0.02em] text-ink md:text-[7.5rem] uppercase">
              <span className="block font-light text-muted">Moritz</span>
              <span className="block font-bold">Frölich.</span>
            </h1>

            <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-3xl border-t border-line/50 pt-8">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-2">Focus</p>
                <p className="text-xl font-medium leading-relaxed">
                  Building <span className="text-accent">playful interfaces</span> and exploring how the web feels.
                </p>
              </div>
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-2">Currently</p>
                <p className="text-xl font-medium leading-relaxed">{siteConfig.description}</p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/writing"
                className="group relative flex h-14 items-center justify-center overflow-hidden bg-ink px-8 font-display text-sm font-bold uppercase tracking-widest text-paper transition-all hover:bg-accent"
              >
                <span className="relative z-10 transition-transform group-hover:-translate-y-10">Read writing</span>
                <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-10 transition-transform group-hover:translate-y-0">
                  Read writing
                </span>
              </Link>
            </div>
          </div>

          <aside className="reveal delay-2 col-span-1 md:col-span-4 relative flex items-end justify-end">
            <div className="w-full max-w-[320px] aspect-[4/5] bg-paperSoft border border-line p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/10 blur-3xl rounded-full" />

              <div className="relative z-10">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Live update
                </p>
                <h2 className="font-display text-3xl leading-tight tracking-tight mb-4">
                  Currently discovering agentic coding workflows
                </h2>
                <p className="text-sm text-muted">
                  didn't expect that shift to come so early, but early 2026 proved me wrong 😂
                </p>
              </div>

              <div className="relative z-10 self-end w-32 h-32 transform transition-transform duration-700 group-hover:scale-110">
                <ClayAvatar />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="-mx-6 mb-24 reveal delay-2 overflow-hidden border-y border-line">
        <Marquee
          text="LATEST WRITING • MUSIC & CULTURE • THOUGHTS • ESSAYS • NOTES"
          className="bg-paperSoft text-muted"
        />
      </div>

      <section className="relative z-10 mb-32 grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 flex flex-col items-start">
          <h2 className="font-display text-5xl font-light tracking-tighter uppercase md:text-6xl mb-6">
            Writing
            <span className="block font-bold text-accent">01.</span>
          </h2>
          <p className="text-lg text-muted mb-8 max-w-sm">
            Essays, notes, and technical deep-dives into interface engineering and design.
          </p>
          <Link
            href="/writing"
            className="font-display text-sm font-bold uppercase tracking-widest text-ink hover:text-accent flex items-center gap-2"
          >
            <span className="w-8 h-px bg-current" />
            View all posts
          </Link>
        </div>

        <div className="md:col-span-8">
          <div className="stagger-children flex flex-col border-t border-line">
            {recentPosts.slice(0, 4).map((post, i) => (
              <article
                key={post.id}
                className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-b border-line hover:bg-paperSoft/50 transition-colors -mx-6 px-6 md:mx-0 md:px-4"
              >
                <div className="flex items-center gap-6">
                  <span className="font-display text-sm text-muted w-6">{(i + 1).toString().padStart(2, '0')}</span>
                  <h3 className="font-display text-3xl font-medium tracking-tight text-ink group-hover:text-accent transition-colors">
                    <Link href={`/writing/${post.slug}`} className="before:absolute before:inset-0">
                      {post.title}
                    </Link>
                  </h3>
                </div>
                <div className="flex items-center gap-4 pl-12 md:pl-0">
                  <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">
                    {formatDate(post.publishedAt)}
                  </p>
                  <span className="text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mb-32 grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 flex flex-col items-start">
          <h2 className="font-display text-5xl font-light tracking-tighter uppercase md:text-6xl mb-6">
            Playlists
            <span className="block font-bold text-accentAlt">02.</span>
          </h2>
          <p className="text-lg text-muted mb-8 max-w-sm">
            Curated soundscapes and monthly mixes to code, think, or zone out to.
          </p>
          <Link
            href="/playlists"
            className="font-display text-sm font-bold uppercase tracking-widest text-ink hover:text-accentAlt flex items-center gap-2"
          >
            <span className="w-8 h-px bg-current" />
            View all playlists
          </Link>
        </div>

        <div className="md:col-span-8">
          <div className="stagger-children flex flex-col border-t border-line">
            {playlistPreview.length > 0 ? (
              playlistPreview.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />)
            ) : (
              <div className="border border-line bg-paperSoft p-8 text-center font-display text-sm font-bold uppercase tracking-widest text-muted">
                Playlists unavailable
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-10 mb-32 grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 flex flex-col items-start">
          <h2 className="font-display text-5xl font-light tracking-tighter uppercase md:text-6xl mb-6">
            Projects
            <span className="block font-bold text-highlight">03.</span>
          </h2>
          <p className="text-lg text-muted mb-8 max-w-sm">
            Open source utilities, product experiments, and self-hosted builds that map the work beyond writing.
          </p>
          <Link
            href="/projects"
            className="font-display text-sm font-bold uppercase tracking-widest text-ink hover:text-highlight flex items-center gap-2"
          >
            <span className="w-8 h-px bg-current" />
            View all projects
          </Link>
        </div>

        <div className="md:col-span-8">
          {featuredProjects.length > 0 ? (
            <div className="stagger-children grid gap-6 md:grid-cols-1">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="border border-line bg-paperSoft p-8 text-center font-display text-sm font-bold uppercase tracking-widest text-muted">
              Projects coming soon
            </div>
          )}
        </div>
      </section>

      <section className="relative z-10 reveal delay-3 border border-line bg-ink text-paper p-8 md:p-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tighter uppercase md:text-5xl leading-[1.1] mb-6">
              Connect & <br />
              <span className="text-accentSoft font-light">Collaborate.</span>
            </h2>
            <p className="text-paper/70 font-medium text-lg max-w-md">
              I share side projects, experiments, and monthly music picks across different platforms.
            </p>
          </div>

          <div className="flex flex-col gap-px bg-line/20 border border-line/20">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between bg-ink p-6 transition-colors hover:bg-paper/5"
              >
                <span className="font-display text-sm font-bold uppercase tracking-widest text-paper/90 group-hover:text-white">
                  {link.label}
                </span>
                <span className="text-accentSoft transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
