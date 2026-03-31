# Feature: Projects Showcase

## Overview

Add a projects section that showcases Moritz's work across three categories: open source packages, SaaS products, and self-hosted software run for fun. The feature should give visitors a clearer picture of what he builds, while fitting the site's existing editorial tone and local-content architecture.

Projects will be authored locally as MDX files in the repository rather than through Notion. The first version includes a listing page at `/projects`, individual project detail pages, a homepage preview section, and navigation integration.

## User Stories

- As a professional contact or hiring team, I want to see Moritz's projects in one place so that I can evaluate his technical range and product taste.
- As a peer or open-source contributor, I want to browse packages and repos so that I can discover tools worth using or contributing to.
- As a casual visitor, I want to scan projects by type so that I can quickly find the work that interests me most.
- As Moritz, I want to add a new project by creating a local MDX file so that I can publish and update projects without introducing a new CMS dependency.

## Technical Approach

Projects should fit the current architecture as another locally sourced public content type, similar to how the `About` page already lives in the app rather than in Notion. A local MDX approach keeps the feature aligned with the current Vercel-hosted Next.js architecture, avoids new infrastructure, and allows richer long-form project pages than a simple data file.

The feature should introduce a `content/projects/` directory containing `.mdx` files with frontmatter metadata, plus a `lib/projects/` data layer for reading, parsing, typing, and sorting project entries. Public routes should live under `app/projects/` and use static generation with the same editorial design language already used for writing and playlists. The homepage should gain a third preview section, and the main navigation should expose a `Projects` destination.

Suggested frontmatter fields:

```yaml
title: "Project Name"
tagline: "One-line description"
category: "open-source" | "saas" | "hosted"
liveUrl: "https://..."      # optional
repoUrl: "https://..."      # optional
tech: ["Next.js", "TypeScript", "Redis"]
status: "active" | "archived" | "experimental"
featured: true
seoTitle: "..."             # optional
seoDescription: "..."       # optional
```

Affected areas:

- `app/page.tsx` for homepage preview integration
- `app/projects/page.tsx` for the projects listing
- `app/projects/[slug]/page.tsx` for project detail pages
- `app/sitemap.ts` to include project URLs
- `components/site/` for a reusable project summary card
- `components/site/site-header.tsx` for navigation
- `lib/` for project parsing and lookup helpers

Potential new dependencies:

- `gray-matter` for frontmatter parsing
- An MDX rendering solution suitable for the current Next.js setup

## Implementation Plan

- [x] Add project content support by introducing a local `content/projects/` directory, typed frontmatter schema, and `lib/projects/` helpers to load, parse, validate, sort, and retrieve project entries by slug.
- [x] Choose and integrate the MDX rendering approach for project bodies, keeping it compatible with the existing Next.js App Router and prose styling.
- [x] Seed the new content model with an initial real project entry for `az-npm`, so the UI can be built against actual content without inventing placeholder projects.
- [x] Build `/projects` as an editorial listing page with category-based browsing for open source, SaaS, and hosted projects.
- [x] Create a reusable `project-card` component for use on the listing page and homepage preview, including category, status, tech tags, and external links.
- [x] Build `/projects/[slug]` detail pages with static params, metadata generation, MDX body rendering, and graceful handling for missing slugs.
- [x] Add a homepage `Index 03` projects section that highlights featured projects and matches the existing sectional rhythm of writing and playlists.
- [x] Add `Projects` to the main navigation and include project detail URLs in the sitemap.
- [x] Add tests for the project data layer and any parsing/typing logic that could regress silently.

## Dependencies

- Existing project docs and architecture are already in place.
- No new infrastructure or external service is required for v1.
- The feature depends on selecting and implementing an MDX rendering strategy for local content.
- The current editorial design system, theme support, and shared site components can be reused.

## Acceptance Criteria

- [ ] `/projects` displays a list of all projects authored from local content files.
- [ ] The first version supports exactly three project categories: open source, SaaS, and hosted-for-fun software.
- [ ] Each project can optionally expose a live URL and repository URL.
- [ ] `/projects/[slug]` renders a dedicated detail page with metadata and full body content.
- [ ] The homepage includes an `Index 03` preview section for featured projects.
- [ ] `Projects` appears in the main navigation and reflects the active state like other primary sections.
- [ ] Project detail pages are included in the generated sitemap.
- [ ] The feature works in both light and dark themes and follows the existing editorial visual language.
- [ ] Missing or malformed project content fails in a controlled, debuggable way during development.
- [ ] `npm run check` passes after implementation.
