import Link from 'next/link';

import type { PostSummary } from '@/lib/notion/types';

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));

export const PostCard = ({ post }: { post: PostSummary }) => {
  return (
    <article className="surface group rounded-3xl p-6">
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
              className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.13em] text-accent"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-6">
        <Link
          href={`/writing/${post.slug}`}
          className="inline-flex rounded-full border-2 border-line bg-paper px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink transition hover:border-accent/[0.45] hover:text-accent active:scale-95"
        >
          Read more
        </Link>
      </div>
    </article>
  );
};
