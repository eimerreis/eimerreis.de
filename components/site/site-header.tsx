import Link from 'next/link';

import { siteConfig } from '@/lib/site-config';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/playlists', label: 'Playlists' },
  { href: '/about', label: 'About' }
];

export const SiteHeader = () => {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-6 pb-10 pt-12 md:flex-row md:items-end md:justify-between md:pb-14">
      <div className="reveal">
        <p className="eyebrow mb-3">Eimer Reis</p>
        <Link
          href="/"
          className="font-display text-4xl tracking-tight text-ink transition hover:text-accent md:text-5xl"
        >
          {siteConfig.name}
        </Link>
        <p className="mt-3 max-w-xl text-sm text-muted md:text-base">{siteConfig.tagline}</p>
      </div>

      <div className="reveal delay-1 flex flex-wrap items-center gap-2 md:justify-end">
        <nav aria-label="Main" className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="surface rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-muted hover:-translate-y-0.5 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};
