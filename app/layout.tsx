import type { Metadata } from 'next';
import Script from 'next/script';
import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';

import './globals.css';
import { siteConfig } from '@/lib/site-config';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { ThemeProvider } from '@/components/site/theme-provider';

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
