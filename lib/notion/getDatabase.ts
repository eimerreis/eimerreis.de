import {
  DatePropertyItemObjectResponse,
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';
import { generateSlug } from '../util/generateSlug';
import { extractTitle } from './getPage';

export type PageType = Awaited<ReturnType<typeof getDatabase>>[0];

export const getDatabase = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
  });
  return response.results.map((page: PageObjectResponse) => {
    const description = page.properties['Description'] as unknown as RichTextPropertyItemObjectResponse;

    const publishDate = page.properties['Publish Date'] as DatePropertyItemObjectResponse;

    const result = {
      ...page,
      title: extractTitle(page),
      slug: generateSlug(extractTitle(page)),
      publishDate: publishDate.date && publishDate.date.start,
      description: description.rich_text[0] ? description.rich_text[0].plain_text : '',
    };
    return result;
  });
};

export const filterRelevantPages = (page: PageObjectResponse) => {
  const property = page.properties['Publish To Website'];
  return property.type === 'checkbox' && property.checkbox === true;
};

export const sortByPublishDate = (a: PageType, b: PageType) =>
  new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
