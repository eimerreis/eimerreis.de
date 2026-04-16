# Product

## Vision

`eimerreis.de` is a personal editorial website for Moritz Frölich. It exists to give visitors a fast, memorable sense of who he is, what he builds, and what he pays attention to through writing, playlists, and a distinctive visual identity.

The product combines authored content with curated music to feel more like a personal home on the web than a standard portfolio.

## Target Users

- Peers, creatives, and collaborators who want to understand Moritz's perspective and craft.
- Clients, hiring teams, or professional contacts evaluating his work and taste.
- Friends, community members, and casual visitors exploring his writing and playlists.

## Goals

- Build a strong first impression of identity, taste, and craft within the first viewport.
- Publish writing through a lightweight Notion-backed workflow.
- Maintain a browsable archive of curated Spotify playlists.
- Present content with clear editorial hierarchy, strong metadata, and search-friendly discovery.
- Support lightweight operational maintenance for Spotify publishing through a private admin flow.

## Core Features

- Home page introducing Moritz and surfacing recent writing, playlists, and social links.
- Writing archive grouped by year with topic tags.
- Individual writing pages rendered from Notion blocks.
- Playlist archive sourced from Spotify and cached for static delivery.
- About page describing professional focus, creative work, and current interests.
- RSS feed, sitemap, and robots endpoints for distribution and discoverability.
- Private Spotify admin area for OAuth connection and monthly playlist publishing automation.
- Light and dark themes within the site's editorial design system.

## Content Model

- Writing is currently the primary Notion-backed content type.
- Additional editorial pages can be sourced from Notion through an optional pages database.
- Some pages, including the current `About` page, are implemented locally in the app.

## Product Notes

- Notion is the primary CMS for published writing, not necessarily for every page on the site.
- Spotify acts as a secondary live content source rather than a full user-facing product area with account features.
