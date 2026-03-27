'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/lib/site-config';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/playlists', label: 'Playlists' },
  // { href: '/about', label: 'About' }
];

export const SiteHeader = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-6 pb-10 pt-10 md:flex-row md:items-end md:justify-between md:pb-12 border-b border-line mb-8">
      <div className="reveal-soft">
        <Link
          href="/"
          className="font-display text-4xl font-bold tracking-tighter text-ink transition hover:text-accent md:text-5xl uppercase leading-none"
        >
          {siteConfig.name}
        </Link>
        <p className="mt-4 max-w-xl text-sm font-medium text-muted/80 md:text-base">{siteConfig.tagline}</p>
      </div>

      <div className="reveal-soft delay-1 flex flex-col md:items-end gap-6">
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
        <nav aria-label="Main" className="flex flex-wrap gap-4">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center justify-center overflow-hidden py-2 text-sm font-display font-bold uppercase tracking-widest transition-colors ${
                  active ? 'text-accent' : 'text-muted hover:text-ink'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <span
                  className={`relative z-10 flex items-center gap-2 transition-transform duration-300 ${active ? '' : 'group-hover:-translate-y-8'}`}
                >
                  {active && <span className="w-2 h-2 rounded-full bg-accent" />}
                  {link.label}
                </span>
                {!active && (
                  <span className="absolute inset-0 z-10 flex items-center gap-2 translate-y-8 transition-transform duration-300 group-hover:translate-y-0 text-ink">
                    {link.label}
                  </span>
                )}
                {active && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
