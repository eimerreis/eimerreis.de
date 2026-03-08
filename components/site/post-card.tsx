import Link from 'next/link';

import type { PostSummary } from '@/lib/notion/types';

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value));

export const PostCard = ({ post }: { post: PostSummary }) => {
  return (
    <article className="surface group rounded-3xl p-6 transition hover:-translate-y-1">
      <p className="text-xs uppercase tracking-[0.12em] text-muted">{formatDate(post.publishedAt)}</p>
      <h3 className="mt-3 font-display text-[2.15rem] leading-[1.06] tracking-tight text-ink transition group-hover:text-accent">
        <Link href={`/writing/${post.slug}`}>{post.title}</Link>
      </h3>
      {post.description ? <p className="mt-4 text-muted">{post.description}</p> : null}
      {post.topics.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {post.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-[11px] uppercase tracking-[0.13em] text-accent"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};
