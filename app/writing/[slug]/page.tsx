import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { NotionBlockRenderer } from '@/components/notion/notion-block-renderer';
import { ReadingCompletion } from '@/components/site/reading-completion';
import { getPostBySlug, getPostSlugs, getPosts } from '@/lib/notion/getDatabase';
import { siteConfig } from '@/lib/site-config';

export const revalidate = 1800;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: siteConfig.name,
    };
  }

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.description,
      url: `${siteConfig.url}/writing/${post.slug}`,
      type: 'article',
    },
  };
}

export default async function WritingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPostBySlug(slug), getPosts()]);

  if (!post) {
    notFound();
  }

  const postIndex = posts.findIndex((item) => item.slug === slug);
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const previousPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return (
    <article className="pb-14 pt-2">
      <header className="mx-auto pb-12 reveal">
        <p className="eyebrow">{formatDate(post.publishedAt)}</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[1.01] tracking-[-0.03em] md:text-7xl">
          {post.title}
        </h1>
        {post.description ? <p className="mt-6 max-w-3xl text-lg text-muted md:text-xl">{post.description}</p> : null}
        {post.topics.length > 0 ? (
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {post.topics.map((topic, index) => (
              <li
                key={topic}
                className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] ${
                  index % 2 === 0
                    ? 'border-accent/45 bg-accent/10 text-accent'
                    : 'border-accentAlt/[0.45] bg-accentAlt/10 text-accentAlt'
                }`}
              >
                {topic}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <section className="reveal-soft delay-1">
        <div className="surface rounded-[2rem] px-6 py-7 md:px-10 md:py-10">
          <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert">
            <NotionBlockRenderer blocks={post.blocks} />
          </div>
        </div>
      </section>

      <ReadingCompletion slug={post.slug} nextPost={nextPost} previousPost={previousPost} />

      <section className="stagger-children mx-auto mt-14 grid max-w-5xl gap-4 reveal delay-2 md:grid-cols-2">
        {previousPost ? (
          <Link href={`/writing/${previousPost.slug}`} className="surface rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Previous</p>
            <p className="mt-2 font-display text-2xl tracking-tight transition hover:text-accent">
              {previousPost.title}
            </p>
          </Link>
        ) : null}
        {nextPost ? (
          <Link href={`/writing/${nextPost.slug}`} className="surface rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Next</p>
            <p className="mt-2 font-display text-2xl tracking-tight transition hover:text-accentAlt">
              {nextPost.title}
            </p>
          </Link>
        ) : null}
      </section>
    </article>
  );
}
