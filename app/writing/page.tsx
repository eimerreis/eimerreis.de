import Link from 'next/link';

import { getPosts, getTopicSummary, groupPostsByYear } from '@/lib/notion/getDatabase';

export const revalidate = 1800;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));

export default async function WritingPage() {
  const posts = await getPosts();
  const groupedPosts = groupPostsByYear(posts);
  const topics = getTopicSummary(posts);
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="pb-24 pt-12 relative z-10">
      <header className="reveal pb-16 mb-16 border-b border-line">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] w-12 bg-accent" />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">Writing</p>
        </div>

        <h1 className="max-w-4xl font-display text-[3.5rem] leading-[0.9] tracking-[-0.02em] text-ink md:text-[5rem] uppercase font-bold">
          Notes with a <span className="text-accent">frontend pulse</span>.
        </h1>

        {topics.length > 0 ? (
          <div className="mt-12 flex flex-wrap gap-3">
            {topics.map((topic, index) => (
              <div
                key={topic}
                className={`font-display text-xs font-bold uppercase tracking-widest px-4 py-2 border ${
                  index % 3 === 0
                    ? 'border-accent text-accent bg-accent/5'
                    : index % 3 === 1
                      ? 'border-accentAlt text-accentAlt bg-accentAlt/5'
                      : 'border-ink text-ink bg-paperSoft'
                }`}
              >
                {topic}
              </div>
            ))}
          </div>
        ) : null}
      </header>

      {posts.length === 0 ? (
        <section className="border border-line bg-paperSoft p-8 md:p-12 max-w-2xl">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-4">
            Archive in progress
          </p>
          <h2 className="font-display text-3xl font-light uppercase tracking-tight md:text-4xl mb-6">
            No published notes yet.
          </h2>
          <p className="text-muted/80 font-medium mb-6">
            As soon as your first note is marked for website publishing, it appears here.
          </p>
          <p className="font-display text-[10px] uppercase tracking-widest text-muted bg-paper px-3 py-2 border border-line inline-block">
            System check: Notion flags and database mapped
          </p>
        </section>
      ) : null}

      <div className="space-y-24 reveal delay-1">
        {years.map((year) => (
          <section key={year} className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <h2 className="font-display text-6xl font-light tracking-tighter text-ink md:text-8xl sticky top-8">
                {year}
              </h2>
            </div>

            <div className="md:col-span-9 flex flex-col border-t border-line">
              <div className="stagger-children">
                {groupedPosts[year].map((post, i) => (
                  <article
                    key={post.id}
                    className="group relative flex flex-col py-10 border-b border-line hover:bg-paperSoft/50 transition-colors -mx-6 px-6 md:mx-0 md:px-6"
                  >
                    <div className="flex flex-col gap-6 mb-4 md:grid md:grid-cols-[minmax(0,1fr)_11rem] md:items-start md:gap-8">
                      <div className="flex items-start gap-6 min-w-0 max-w-[48rem]">
                        <span className="font-display text-sm text-muted w-6 pt-2">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink group-hover:text-accent transition-colors">
                            <Link href={`/writing/${post.slug}`} className="before:absolute before:inset-0">
                              {post.title}
                            </Link>
                          </h3>
                          {post.description ? (
                            <p className="mt-4 text-lg text-muted/90 font-medium leading-relaxed">{post.description}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="pl-12 md:pl-0 flex items-center md:justify-end md:self-start shrink-0 mt-4 md:mt-2">
                        <p className="font-display text-xs font-bold uppercase tracking-widest text-muted bg-paper border border-line px-3 py-1 whitespace-nowrap text-left md:min-w-[10rem] md:text-right">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
