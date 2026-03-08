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
    <div className="pb-10">
      <header className="reveal pb-12 pt-2">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Archive</h1>
        <p className="mt-5 max-w-2xl text-muted md:text-lg">
          Essays and notes from the frontend world, design systems, and occasional internet
          rabbit holes.
        </p>
        {topics.length > 0 ? (
          <ul className="mt-7 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-muted"
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
            <h2 className="mb-5 font-display text-4xl tracking-tight text-accent">{year}</h2>
            <div className="space-y-4">
              {groupedPosts[year].map((post) => (
                <article
                  key={post.id}
                  className="surface rounded-2xl px-4 py-3 md:px-5 md:py-5 hover:-translate-y-0.5"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-2 font-display text-[2rem] leading-tight tracking-tight text-ink">
                    <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {post.description ? <p className="mt-3 text-muted">{post.description}</p> : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
