import type { MetadataRoute } from 'next';

import { getPostSlugs } from '@/lib/notion/getDatabase';
import { siteConfig } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postSlugs = await getPostSlugs();

  const staticRoutes = ['', '/writing', '/playlists', '/about'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const writingRoutes = postSlugs.map((slug) => ({
    url: `${siteConfig.url}/writing/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...writingRoutes];
}
