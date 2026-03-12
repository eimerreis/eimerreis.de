import { getPosts } from '@/lib/notion/getDatabase';
import { siteConfig } from '@/lib/site-config';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map(
      (post) => `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${siteConfig.url}/writing/${post.slug}</link>
  <guid>${siteConfig.url}/writing/${post.slug}</guid>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
  <description>${escapeXml(post.description)}</description>
</item>`,
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteConfig.name)}</title>
  <link>${siteConfig.url}</link>
  <description>${escapeXml(siteConfig.description)}</description>
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
