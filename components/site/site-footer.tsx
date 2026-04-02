import Link from 'next/link';

import { siteConfig } from '@/lib/site-config';

const year = new Date().getFullYear();

export const SiteFooter = () => {
  return (
    <footer className="mx-auto mt-24 w-full max-w-6xl border-t-2 border-ink bg-paperSoft relative z-10 px-6">
      <div className="reveal-soft delay-3 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 max-w-sm">
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-ink mb-4">eimerreis</p>
            <p className="text-lg text-muted font-medium leading-relaxed mb-6">
              Built with Notion as CMS and a custom Next.js frontend.
            </p>
            <div className="flex items-center gap-2 font-display text-[10px] uppercase tracking-widest text-muted border border-line bg-paper px-3 py-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Systems online
            </div>
          </div>

          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-6">Index</p>
            <div className="flex flex-col gap-4 font-display text-sm font-bold uppercase tracking-widest text-ink/80">
              <Link href="/" className="hover:text-accent transition-colors flex items-center gap-2 group">
                <span className="w-4 h-px bg-line group-hover:w-6 group-hover:bg-accent transition-all" />
                Home
              </Link>
              <Link href="/writing" className="hover:text-accent transition-colors flex items-center gap-2 group">
                <span className="w-4 h-px bg-line group-hover:w-6 group-hover:bg-accent transition-all" />
                Writing
              </Link>
              <Link href="/playlists" className="hover:text-accentAlt transition-colors flex items-center gap-2 group">
                <span className="w-4 h-px bg-line group-hover:w-6 group-hover:bg-accentAlt transition-all" />
                Playlists
              </Link>
              <Link href="/legalnotice" className="hover:text-ink transition-colors flex items-center gap-2 group">
                <span className="w-4 h-px bg-line group-hover:w-6 group-hover:bg-ink transition-all" />
                Legal Notice
              </Link>
              <a
                href={`${siteConfig.url}/feed.xml`}
                className="hover:text-highlight transition-colors flex items-center gap-2 group"
              >
                <span className="w-4 h-px bg-line group-hover:w-6 group-hover:bg-highlight transition-all" />
                RSS
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-6">Social</p>
            <div className="flex flex-col gap-4 font-display text-sm font-bold uppercase tracking-widest text-ink/80">
              {siteConfig.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-line group-hover:w-6 group-hover:bg-accent transition-all" />
                  {link.label}
                  <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ml-1">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">© {year} eimerreis.</p>
          <p className="font-display text-[10px] uppercase tracking-widest text-muted/60">Designed for reading.</p>
        </div>
      </div>
    </footer>
  );
};
