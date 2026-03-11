import Link from 'next/link';

import { getPosts, getTopicSummary, groupPostsByYear } from '@/lib/notion/getDatabase';

export const revalidate = 1800;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value));

export default async function WritingPage() {
  const posts = await getPosts();
  const groupedPosts = groupPostsByYear(posts);
  const topics = getTopicSummary(posts);
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="pb-12">
      <header className="reveal pb-12 pt-2">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-[-0.03em] md:text-7xl">
          Notes and essays with a <span className="rainbow-word">frontend pulse</span>.
        </h1>
        <p className="mt-5 max-w-3xl text-muted md:text-lg">
          Deep dives, postmortems, and small epiphanies from building on the web.
        </p>
        {topics.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {topics.map((topic, index) => (
              <li
                key={topic}
                className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] ${
                  index % 3 === 0
                    ? 'border-accent/45 bg-accent/10 text-accent'
                    : index % 3 === 1
                      ? 'border-accentAlt/[0.45] bg-accentAlt/10 text-accentAlt'
                      : 'border-highlight/60 bg-highlight/10 text-ink'
                }`}
              >
                {topic}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {posts.length === 0 ? (
        <div className="surface rounded-3xl p-6 text-sm text-muted">
          No published posts found. Check your Notion database mapping.
        </div>
      ) : null}

      <div className="space-y-12 reveal delay-1">
        {years.map((year) => (
          <section key={year}>
            <h2 className="mb-5 inline-flex rounded-full border border-accent/40 bg-accent/10 px-4 py-1 font-display text-3xl tracking-tight text-accent md:text-4xl">
              {year}
            </h2>
            <div className="stagger-children space-y-4">
              {groupedPosts[year].map((post) => (
                <article
                  key={post.id}
                  className="surface group rounded-2xl px-4 py-4 md:px-6 md:py-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-2 font-display text-[2rem] leading-tight tracking-tight text-ink transition group-hover:text-accent">
                    <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {post.description ? <p className="mt-3 text-muted">{post.description}</p> : null}
                  <div className="mt-4">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="inline-flex rounded-full border-2 border-line bg-paper px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink transition hover:border-accent/[0.45] hover:text-accent active:scale-95"
                    >
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
