# Tech Stack

## Application Framework

- Next.js App Router
  - Evidence: `next` dependency, `app/` route structure, metadata routes, route handlers.
  - Rationale: the site is implemented as a full-stack Next.js app with server components, static regeneration, and built-in API endpoints.

- React 19
  - Evidence: `react` and `react-dom` dependencies pinned to 19.x.
  - Rationale: UI rendering and interactivity are handled entirely through React components inside the Next.js app.

- TypeScript
  - Evidence: `typescript` dependency, `tsconfig.json`, `.ts` and `.tsx` source structure.
  - Rationale: the codebase uses strict typing across routes, data access, and components.

## Frontend and Styling

- Tailwind CSS
  - Evidence: `tailwind.config.js`, `postcss.config.js`, `tailwindcss` dependency.
  - Rationale: the UI uses utility classes with custom theme extensions for the site's editorial visual language.

- `@tailwindcss/typography`
  - Evidence: dependency and Tailwind plugin registration.
  - Rationale: Notion-authored post content is rendered with prose styling.

- `next-themes`
  - Evidence: dependency and theme provider usage in `app/layout.tsx`.
  - Rationale: dark mode is implemented with class-based theme switching.

- `next/font/google`
  - Evidence: `app/layout.tsx` loads `Space_Grotesk` and `IBM_Plex_Sans`.
  - Rationale: typography is part of the runtime design system rather than manually hosted font assets.

## Backend Runtime

- Next.js server components and route handlers
  - Evidence: `server-only` imports in data modules and `app/api/**/route.ts` handlers.
  - Rationale: backend logic lives inside the same app, with no separate service in this repository.

- Node.js runtime for admin routes
  - Evidence: `app/api/admin/spotify/publish-eimertunes/route.ts` and logout route export `runtime = 'nodejs'`.
  - Rationale: Spotify admin automation depends on server-side crypto, session, and Redis access.

## Content and External Data

- Official Notion API
  - Evidence: `@notionhq/client` dependency and `lib/notion/*` modules.
  - Rationale: Notion is the primary CMS for published writing and optional page content.

- Spotify Web API
  - Evidence: playlist fetch logic in `lib/spotify/fetchAllPlaylists.ts` and admin OAuth flow in `lib/spotify-admin/*`.
  - Rationale: Spotify provides the playlist archive and the private publishing automation flow.

## Data and Storage

- Notion databases as editorial content storage
  - Evidence: `NOTION_DATABASE_ID` and optional `NOTION_PAGES_DATABASE_ID` usage.
  - Rationale: posts and optional pages are stored outside the app and fetched at request/build time.

- Redis for encrypted Spotify token persistence
  - Evidence: `redis` dependency and `lib/spotify-admin/redis.ts`.
  - Rationale: Spotify admin access and refresh tokens are stored outside the app in Redis rather than in a local database.

- No first-party relational database in repo
  - Evidence: no Prisma, Drizzle, SQL client, or database schema files.
  - Rationale: the app relies on external systems instead of maintaining its own primary application database.

## Caching and Rendering Strategy

- Incremental static regeneration
  - Evidence: `revalidate` exports in home, writing, and playlist routes.
  - Rationale: most visitor-facing pages are statically served but refreshed on a schedule.

- Next.js cache primitives
  - Evidence: `unstable_cache` in `lib/spotify/getCachedPlaylists.ts`.
  - Rationale: Spotify playlist data is cached centrally to avoid repeated upstream fetches.

- Static metadata routes
  - Evidence: `app/feed.xml/route.ts`, `app/sitemap.ts`, `app/robots.ts`.
  - Rationale: discoverability artifacts are generated directly from the app's content sources.

## Tooling and Quality

- Biome
  - Evidence: `@biomejs/biome` dependency, `biome.json`, `lint` and `format` scripts.
  - Rationale: Biome is the project's formatter and linter.

- TypeScript compiler
  - Evidence: `typecheck` script runs `tsc --noEmit`.
  - Rationale: type safety is enforced as part of the standard quality check.

- Vitest
  - Evidence: `vitest` dependency, `vitest.config.ts`, `test` script.
  - Rationale: unit tests cover server-side helpers and integration boundaries.

- npm
  - Evidence: `package-lock.json`, CI uses `npm ci`.
  - Rationale: npm is the package manager and the expected install workflow.

## Infrastructure and Deployment

- Vercel
  - Evidence: confirmed by user.
  - Rationale: the app is a Vercel-friendly Next.js deployment with built-in support for App Router, route handlers, and scheduled/static regeneration patterns.

- GitHub Actions for CI
  - Evidence: `.github/workflows/run-tests.yml`.
  - Rationale: pushes and pull requests to `main` run `npm ci` and `npm run check`.

## Key Libraries and Integrations

- `@notionhq/client` for CMS access.
- `redis` for token storage.
- `next-themes` for theming.
- `@tailwindcss/typography` for editorial prose styling.
- `classnames` and `slugify` for UI and content utilities.
- Plausible Analytics via optional script injection in `app/layout.tsx`.
