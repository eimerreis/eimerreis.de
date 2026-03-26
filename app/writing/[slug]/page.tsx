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
    <article className="pb-24 pt-12 relative z-10">
      <header className="mx-auto pb-16 reveal border-b border-line mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] w-12 bg-accent" />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">
            {formatDate(post.publishedAt)}
          </p>
        </div>
        <h1 className="max-w-5xl font-display text-[3.5rem] leading-[0.9] tracking-[-0.02em] text-ink md:text-[5.5rem] font-bold uppercase">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-8 max-w-3xl text-xl font-medium text-muted/90 leading-relaxed border-l-4 border-accent pl-6">
            {post.description}
          </p>
        ) : null}

        {post.topics.length > 0 ? (
          <div className="mt-12 flex flex-wrap gap-3">
            {post.topics.map((topic, index) => (
              <div
                key={topic}
                className={`font-display text-xs font-bold uppercase tracking-widest px-4 py-2 border ${
                  index % 2 === 0
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-accentAlt text-accentAlt bg-accentAlt/5'
                }`}
              >
                {topic}
              </div>
            ))}
          </div>
        ) : null}
      </header>

      <section className="reveal-soft delay-1 max-w-4xl mx-auto">
        <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert">
          <NotionBlockRenderer blocks={post.blocks} />
        </div>
      </section>

      <ReadingCompletion slug={post.slug} nextPost={nextPost} previousPost={previousPost} />

      <section className="stagger-children mx-auto mt-24 grid max-w-5xl gap-6 reveal delay-2 md:grid-cols-2 pt-16 border-t border-line">
        {previousPost ? (
          <Link
            href={`/writing/${previousPost.slug}`}
            className="group flex flex-col items-start gap-4 p-6 border border-line bg-paperSoft hover:bg-paper hover:border-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-accent transform group-hover:-translate-x-2 transition-transform">&larr;</span>
              <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">Previous</p>
            </div>
            <p className="font-display text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
              {previousPost.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/writing/${nextPost.slug}`}
            className="group flex flex-col items-end text-right gap-4 p-6 border border-line bg-paperSoft hover:bg-paper hover:border-accentAlt transition-colors"
          >
            <div className="flex items-center gap-3">
              <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">Next</p>
              <span className="text-accentAlt transform group-hover:translate-x-2 transition-transform">&rarr;</span>
            </div>
            <p className="font-display text-2xl font-bold tracking-tight text-ink group-hover:text-accentAlt transition-colors">
              {nextPost.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </section>
    </article>
  );
}
