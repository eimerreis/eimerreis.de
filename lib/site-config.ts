export const siteConfig = {
  name: process.env.SITE_NAME ?? 'eimerreis.de',
  title: process.env.SITE_NAME ?? 'Eimer Reis',
  tagline:
    process.env.SITE_TAGLINE ?? 'Writing about frontend craft, internet culture, and the things worth replaying.',
  description:
    process.env.SITE_DESCRIPTION ?? 'A personal website collecting essays, notes, and monthly playlists by Eimer Reis.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eimerreis.de',
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'eimerreis.de',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/eimerreis' },
    { label: 'Instagram', href: 'https://www.instagram.com/eimerreis' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/moritz-fr%C3%B6lich-28a515156/' },
    { label: 'Spotify', href: 'https://open.spotify.com/user/eimerreis' },
  ],
  aboutFallback: {
    title: 'About',
    description:
      'I build for the web, write when a thought sticks, and keep a monthly playlist to remember what the year sounded like.',
    paragraphs: [
      'This site is a calmer, more editorial home for writing and side obsessions.',
      'Notion remains the publishing backend so the editing flow stays simple, while the frontend becomes fully custom.',
    ],
  },
};

export type SiteConfig = typeof siteConfig;
