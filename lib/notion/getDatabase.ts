import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';
import { generateSlug } from '../util/generateSlug';
import { extractTitle } from './getPage';

export const getDatabase = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
  });
  return response.results.map((page: PageObjectResponse) => ({
    ...page,
    title: extractTitle(page),
    slug: generateSlug(extractTitle(page)),
  }));
};

export const filterRelevantPages = (page: PageObjectResponse) => {
  const property = page.properties['Publish To Website'];
  return property.type === 'checkbox' && property.checkbox === true;
};
