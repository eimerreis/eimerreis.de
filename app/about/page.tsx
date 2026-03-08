import { NotionBlockRenderer } from '@/components/notion/notion-block-renderer';
import { getPageBySlug } from '@/lib/notion/getDatabase';
import { siteConfig } from '@/lib/site-config';

export const revalidate = 1800;

export default async function AboutPage() {
  const aboutPage = await getPageBySlug('about');

  return (
    <div className="pb-10 pt-2">
      <header className="reveal pb-12">
        <p className="eyebrow">Profile</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
          {aboutPage?.title ?? siteConfig.aboutFallback.title}
        </h1>
        <p className="mt-5 max-w-2xl text-muted md:text-lg">
          {aboutPage?.description ?? siteConfig.aboutFallback.description}
        </p>
      </header>

      {aboutPage ? (
        <section className="max-w-measure prose prose-lg prose-neutral reveal delay-1 dark:prose-invert">
          <NotionBlockRenderer blocks={aboutPage.blocks} />
        </section>
      ) : (
        <section className="max-w-measure space-y-4 text-lg leading-relaxed text-ink/90 reveal delay-1">
          {siteConfig.aboutFallback.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      )}
    </div>
  );
}
