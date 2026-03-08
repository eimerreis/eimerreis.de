# eimerreis.de Redesign Implementation Spec

## Goals

- Rebuild the site as a modern App Router Next.js application.
- Keep Notion as the primary CMS for editorial content.
- Replace the starter-template look with a more personal editorial design system.
- Keep Spotify playlist integration as a live secondary data source.
- Improve maintainability, metadata, and deployment readiness.

## Product Direction

- Position the website as a personal home on the web for writing and curated playlists.
- Make `Writing`, `Playlists`, and `About` first-class destinations.
- Use a warmer editorial art direction with deliberate typography, layered surfaces, and restrained motion.
- Preserve static performance through App Router caching and server rendering.

## Route Map

- `/` - home with intro, featured writing, recent archive, playlist spotlight, and about preview
- `/writing` - writing archive grouped by year
- `/writing/[slug]` - post detail page rendered from Notion blocks
- `/playlists` - EimerTunes archive sourced from Spotify
- `/about` - profile/about page sourced from Notion when available, otherwise from local fallback config
- `/feed.xml` - RSS feed for published writing
- `/sitemap.xml` - sitemap generated from routes and posts
- `/robots.txt` - search directives

## Data Sources

### Notion

- `NOTION_API_KEY` - official Notion integration token
- `NOTION_DATABASE_ID` - posts database
- `NOTION_PAGES_DATABASE_ID` - optional pages database for pages like `about`

### Spotify

- `SPOTIFY_CLIENT_ID` or legacy `CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET` or legacy `CLIENT_SECRET`
- `SPOTIFY_USER_ID` optional, defaults to `eimerreis`

## Notion Schema

### Posts Database

- `Name` or `Title` - title
- `Slug` - optional explicit slug, otherwise generated from title
- `Description` - excerpt used on lists and metadata
- `Publish Date` or `Date` - publication date
- `Publish To Website` or `Published` - checkbox
- `Topics` or `Tags` - multi-select
- `Featured` - checkbox
- `SEO Title` - optional
- `SEO Description` - optional

### Pages Database

- `Name` or `Title`
- `Slug`
- `Description`
- `Publish To Website` or `Published`
- `SEO Title`
- `SEO Description`

## Architecture

- `app/` for routing, metadata, and global layout
- `components/site/` for navigation, cards, and layout primitives
- `components/notion/` for rich text and block rendering
- `lib/notion/` for typed Notion queries and block hydration
- `lib/spotify/` for token and playlist fetching
- `lib/site-config.ts` for site copy, links, and metadata defaults

## Rendering Strategy

- Use the official Notion API only.
- Fetch page blocks recursively, including nested children.
- Render a focused subset of block types with custom React components:
  - paragraph
  - heading 1/2/3
  - bulleted and numbered lists
  - quote
  - callout
  - code
  - divider
  - image
  - bookmark
- Unsupported blocks degrade gracefully.

## Design System

- Typography: `Newsreader` for headings, `IBM Plex Sans` for body and UI
- Color system: warm paper background, deep ink foreground, muted accent, dark theme counterpart
- Layout: asymmetrical editorial hero, strong content rhythm, narrower reading width on posts
- Motion: low-JS transitions only; no template-style full-screen overlay menu

## Delivery Steps

1. Replace starter-template config with a modern Next.js foundation.
2. Implement typed Notion and Spotify data layers with safe fallbacks.
3. Build new App Router pages and site components.
4. Add metadata routes and analytics script integration.
5. Remove legacy pages-router code and obsolete template utilities.
6. Run lint, tests, and production build.
