## eimerreis.de

Personal website for writing, playlists, and editorial pages powered by Notion.

### Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Official Notion API
- Spotify Web API via server-side fetch

### Environment Variables

Required for content:

- `NOTION_API_KEY`
- `NOTION_DATABASE_ID`

Optional:

- `NOTION_PAGES_DATABASE_ID`
- `SPOTIFY_CLIENT_ID` or `CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET` or `CLIENT_SECRET`
- `SPOTIFY_USER_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `SITE_NAME`
- `SITE_TAGLINE`
- `SITE_DESCRIPTION`

### Notion Schema

Posts database should expose these properties:

- `Name` or `Title`
- `Slug`
- `Description`
- `Publish Date` or `Date`
- `Publish To Website` or `Published`
- `Topics` or `Tags`
- `Featured`
- `SEO Title`
- `SEO Description`

Optional pages database should include:

- `Name` or `Title`
- `Slug`
- `Description`
- `Publish To Website` or `Published`
- `SEO Title`
- `SEO Description`

### Commands

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run check
```
