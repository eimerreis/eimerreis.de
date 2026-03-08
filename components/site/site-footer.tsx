import { siteConfig } from '@/lib/site-config';

export const SiteFooter = () => {
  return (
    <footer className="mx-auto mt-24 w-full max-w-6xl px-6 pb-12">
      <div className="surface reveal delay-3 flex flex-col gap-4 rounded-3xl px-6 py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-muted">
          Built with Notion as CMS and a custom Next.js frontend.
        </p>
        <div className="flex flex-wrap gap-2">
          {siteConfig.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line/70 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
