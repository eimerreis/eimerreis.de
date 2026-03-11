import Link from 'next/link';

import { siteConfig } from '@/lib/site-config';

const year = new Date().getFullYear();

export const SiteFooter = () => {
  return (
    <footer className="mx-auto mt-24 w-full max-w-6xl px-6 pb-12">
      <div className="surface reveal-soft delay-3 rounded-3xl px-6 py-8 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="eyebrow">Eimer Reis</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Built with Notion as CMS and a custom Next.js frontend.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Browse</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/writing" className="subtle-link">
                Writing
              </Link>
              <Link href="/playlists" className="subtle-link">
                Playlists
              </Link>
              <Link href="/about" className="subtle-link">
                About
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Social</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              {siteConfig.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="subtle-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">General</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/" className="subtle-link">
                Home
              </Link>
              <a href={`${siteConfig.url}/feed.xml`} className="subtle-link">
                RSS
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line/70 pt-4 text-xs uppercase tracking-[0.14em] text-muted">
          © {year} Eimer Reis. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
