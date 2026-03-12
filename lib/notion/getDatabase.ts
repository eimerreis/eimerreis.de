import 'server-only';

import type {
  DatePropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { generateSlug } from '../util/generateSlug';
import { extractTitle, getPlainText, getProperty } from './getPage';
import { getPageBlocks } from './getPageBlocks';
import { notionClient } from './notionClient';
import type { PageEntry, PostDetail, PostSummary } from './types';

const postsDatabaseId = process.env.NOTION_DATABASE_ID;
const pagesDatabaseId = process.env.NOTION_PAGES_DATABASE_ID;

const ensureFullPage = (result: unknown): result is PageObjectResponse => {
  return Boolean(result && typeof result === 'object' && 'properties' in result);
};

const getCheckbox = (page: PageObjectResponse, names: string[]) => {
  const property = getProperty(page, names);
  return property?.type === 'checkbox' ? property.checkbox : false;
};

const getDate = (page: PageObjectResponse, names: string[]) => {
  const property = getProperty(page, names) as DatePropertyItemObjectResponse | undefined;
  return property?.type === 'date' ? (property.date?.start ?? null) : null;
};

const getRichText = (page: PageObjectResponse, names: string[]) => {
  const property = getProperty(page, names);
  if (!property || property.type !== 'rich_text' || !Array.isArray(property.rich_text)) {
    return '';
  }
  return getPlainText(property.rich_text);
};

const getMultiSelectValues = (page: PageObjectResponse, names: string[]) => {
  const property = getProperty(page, names) as MultiSelectPropertyItemObjectResponse | undefined;
  return property?.type === 'multi_select' ? property.multi_select.map((item) => item.name) : [];
};

const getSlug = (page: PageObjectResponse) => {
  const explicitSlug = getRichText(page, ['Slug']);
  return explicitSlug || generateSlug(extractTitle(page));
};

const mapPostSummary = (page: PageObjectResponse): PostSummary => ({
  id: page.id,
  title: extractTitle(page),
  slug: getSlug(page),
  description: getRichText(page, ['Description', 'Excerpt']),
  publishedAt: getDate(page, ['Publish Date', 'Date']) ?? new Date().toISOString(),
  topics: getMultiSelectValues(page, ['Topics', 'Tags']),
  featured: getCheckbox(page, ['Featured']),
  seoTitle: getRichText(page, ['SEO Title']) || undefined,
  seoDescription: getRichText(page, ['SEO Description']) || undefined,
});

const mapPageEntry = async (page: PageObjectResponse): Promise<PageEntry> => ({
  id: page.id,
  title: extractTitle(page),
  slug: getSlug(page),
  description: getRichText(page, ['Description']),
  seoTitle: getRichText(page, ['SEO Title']) || undefined,
  seoDescription: getRichText(page, ['SEO Description']) || undefined,
  blocks: await getPageBlocks(page.id),
});

const sortByPublishedAt = <T extends { publishedAt: string }>(items: T[]) => {
  return items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

const queryAllPages = async (databaseId: string) => {
  if (!notionClient) {
    return [] as PageObjectResponse[];
  }

  const results: unknown[] = [];
  let cursor: string | undefined;

  do {
    const response = await notionClient.databases.query({
      database_id: databaseId,
      page_size: 100,
      start_cursor: cursor,
    });

    results.push(...response.results);
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return results.filter(ensureFullPage);
};

export const getPosts = async (): Promise<PostSummary[]> => {
  if (!notionClient || !postsDatabaseId) {
    return [];
  }

  const pages = await queryAllPages(postsDatabaseId);
  return sortByPublishedAt(
    pages
      .filter((page: PageObjectResponse) => getCheckbox(page, ['Publish To Website', 'Published']))
      .map(mapPostSummary),
  );
};

export const getPostBySlug = async (slug: string): Promise<PostDetail | null> => {
  const posts = await getPosts();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return null;
  }

  return {
    ...post,
    blocks: await getPageBlocks(post.id),
  };
};

export const getFeaturedPosts = async (limit = 2) => {
  const posts = await getPosts();
  const featured = posts.filter((post) => post.featured);
  return (featured.length ? featured : posts).slice(0, limit);
};

export const getRecentPosts = async (limit = 6) => {
  const posts = await getPosts();
  return posts.slice(0, limit);
};

export const getPageBySlug = async (slug: string): Promise<PageEntry | null> => {
  if (!notionClient || !pagesDatabaseId) {
    return null;
  }

  const pages = await queryAllPages(pagesDatabaseId);
  const page = pages.find(
    (entry: PageObjectResponse) => getCheckbox(entry, ['Publish To Website', 'Published']) && getSlug(entry) === slug,
  );

  return page ? mapPageEntry(page) : null;
};

export const getPostSlugs = async () => {
  const posts = await getPosts();
  return posts.map((post) => post.slug);
};

export const groupPostsByYear = (posts: PostSummary[]) => {
  return posts.reduce<Record<string, PostSummary[]>>((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();
    acc[year] = acc[year] ? [...acc[year], post] : [post];
    return acc;
  }, {});
};

export const getTopicSummary = (posts: PostSummary[]) => {
  return Array.from(new Set(posts.flatMap((post) => post.topics))).sort();
};
