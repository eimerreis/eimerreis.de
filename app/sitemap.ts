import type { MetadataRoute } from 'next';

import { getPostSlugs } from '@/lib/notion/getDatabase';
import { getProjectSlugs } from '@/lib/projects';
import { siteConfig } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, projectSlugs] = await Promise.all([getPostSlugs(), getProjectSlugs()]);

  const staticRoutes = ['', '/writing', '/playlists', '/projects', '/about'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const writingRoutes = postSlugs.map((slug) => ({
    url: `${siteConfig.url}/writing/${slug}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...writingRoutes, ...projectRoutes];
}
