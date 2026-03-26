import type { Metadata } from 'next';
import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { ThemeProvider } from '@/components/site/theme-provider';
import { siteConfig } from '@/lib/site-config';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '700'],
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen overflow-x-clip font-sans text-ink antialiased">
        <ThemeProvider>
          {/* Background Grid System Lines */}
          <div className="fixed inset-0 pointer-events-none hidden md:block z-[-1]" aria-hidden="true">
            <div className="absolute top-0 bottom-0 left-[25%] w-px bg-line/20" />
            <div className="absolute top-0 bottom-0 left-[50%] w-px bg-line/20" />
            <div className="absolute top-0 bottom-0 left-[75%] w-px bg-line/20" />
          </div>

          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-6">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        {siteConfig.plausibleDomain ? (
          <Script defer data-domain={siteConfig.plausibleDomain} src="https://plausible.io/js/script.js" />
        ) : null}
      </body>
    </html>
  );
}
