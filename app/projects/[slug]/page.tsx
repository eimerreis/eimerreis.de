import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import { renderProjectMdx } from '@/lib/projects/render';
import { siteConfig } from '@/lib/site-config';

export const revalidate = 1800;

const categoryLabels = {
  'open-source': 'Open source',
  saas: 'SaaS',
  hosted: 'Hosted-for-fun',
} as const;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: siteConfig.name,
    };
  }

  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.tagline,
    openGraph: {
      title: project.seoTitle ?? project.title,
      description: project.seoDescription ?? project.tagline,
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const content = await renderProjectMdx(project.source);

  return (
    <article className="pb-24 pt-12 relative z-10">
      <header className="mx-auto pb-16 reveal border-b border-line mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="h-[2px] w-12 bg-highlight" />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">
            {categoryLabels[project.category]}
          </p>
          {project.year ? (
            <span className="font-display text-xs font-bold uppercase tracking-widest text-muted">{project.year}</span>
          ) : null}
        </div>

        <h1 className="max-w-5xl font-display text-[3.5rem] leading-[0.9] tracking-[-0.02em] text-ink md:text-[5.5rem] font-bold uppercase">
          {project.title}
        </h1>
        <p className="mt-8 max-w-3xl text-xl font-medium text-muted/90 leading-relaxed border-l-4 border-highlight pl-6">
          {project.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <span className="rounded-full border border-line bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">
            {project.status}
          </span>
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-highlight/40 bg-highlight/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-ink dark:text-highlight"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-highlight/50 bg-highlight/10 px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-ink transition hover:bg-highlight/20 active:scale-95 dark:text-highlight"
            >
              Visit live
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accent/[0.45] hover:text-accent active:scale-95"
            >
              View repo
            </a>
          ) : null}
          <Link
            href="/projects"
            className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accentAlt/[0.45] hover:text-accentAlt active:scale-95"
          >
            Back to projects
          </Link>
        </div>
      </header>

      <section className="reveal-soft delay-1 max-w-4xl mx-auto">
        <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert">{content}</div>
      </section>
    </article>
  );
}
