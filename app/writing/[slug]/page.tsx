import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { NotionBlockRenderer } from '@/components/notion/notion-block-renderer';
import { getPostBySlug, getPostSlugs, getPosts } from '@/lib/notion/getDatabase';
import { siteConfig } from '@/lib/site-config';

export const revalidate = 1800;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(value));

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: siteConfig.name
    };
  }

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.description,
      url: `${siteConfig.url}/writing/${post.slug}`,
      type: 'article'
    }
  };
}

export default async function WritingDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPostBySlug(slug), getPosts()]);

  if (!post) {
    notFound();
  }

  const postIndex = posts.findIndex((item) => item.slug === slug);
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const previousPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return (
    <article className="pb-12 pt-2">
      <header className="mx-auto max-w-measure pb-12 reveal">
        <p className="eyebrow">{formatDate(post.publishedAt)}</p>
        <h1 className="mt-3 font-display text-5xl leading-[1.03] tracking-tight md:text-7xl">
          {post.title}
        </h1>
        {post.description ? <p className="mt-6 text-lg text-muted md:text-xl">{post.description}</p> : null}
      </header>

      <section className="mx-auto max-w-measure prose prose-lg prose-neutral reveal delay-1 dark:prose-invert">
        <NotionBlockRenderer blocks={post.blocks} />
      </section>

      <section className="mx-auto mt-20 grid max-w-4xl gap-3 reveal delay-2 md:grid-cols-2">
        {previousPost ? (
          <Link
            href={`/writing/${previousPost.slug}`}
            className="surface rounded-2xl p-5 transition hover:-translate-y-0.5"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Previous</p>
            <p className="mt-2 font-display text-2xl tracking-tight">{previousPost.title}</p>
          </Link>
        ) : null}
        {nextPost ? (
          <Link
            href={`/writing/${nextPost.slug}`}
            className="surface rounded-2xl p-5 transition hover:-translate-y-0.5"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Next</p>
            <p className="mt-2 font-display text-2xl tracking-tight">{nextPost.title}</p>
          </Link>
        ) : null}
      </section>
    </article>
  );
}
