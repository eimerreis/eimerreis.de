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
- `SPOTIFY_ADMIN_ACCOUNT_ID` (defaults to `eimerreis`)
- `SPOTIFY_ADMIN_REDIRECT_URI` (optional; defaults to `<site-url>/api/admin/spotify/callback`)
- `SPOTIFY_ADMIN_TOKEN_SECRET` (required for encrypted admin token storage)
- `SPOTIFY_ADMIN_SESSION_SECRET` (optional, recommended; defaults to `SPOTIFY_ADMIN_TOKEN_SECRET`)
- `SPOTIFY_ADMIN_TOKEN_KEY` (optional; defaults to `spotify:admin:token`)
- `REDIS_URL` (required for Spotify admin token storage)
- `SPOTIFY_CRON_SECRET` (recommended to secure automated job endpoint)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `SITE_NAME`
- `SITE_TAGLINE`
- `SITE_DESCRIPTION`

### Spotify Admin Automation

- Open `/admin` and use **Connect Spotify**.
- The OAuth callback verifies that the authenticated Spotify account matches `SPOTIFY_ADMIN_ACCOUNT_ID`.
- Access + refresh tokens are encrypted with `SPOTIFY_ADMIN_TOKEN_SECRET` and stored in Redis at `SPOTIFY_ADMIN_TOKEN_KEY`.
- Run the monthly publish job manually via `/admin` or by POSTing to `/api/admin/spotify/publish-eimertunes`.
- For cron usage, send `Authorization: Bearer <SPOTIFY_CRON_SECRET>`.

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
