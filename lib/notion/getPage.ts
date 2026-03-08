import type {
  PageObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

import type { RichTextSpan } from './types';

export const getProperty = (page: PageObjectResponse, names: string[]) => {
  return names.map((name) => page.properties[name]).find(Boolean);
};

export const extractTitle = (page: PageObjectResponse): string => {
  const titleProperty = getProperty(page, ['Name', 'Title']);

  if (!titleProperty || titleProperty.type !== 'title') {
    return 'Untitled';
  }

  const title = titleProperty.title;
  return title.map((item) => item.plain_text).join('').trim() || 'Untitled';
};

export const mapRichText = (richText: RichTextItemResponse[] = []): RichTextSpan[] => {
  return richText.map((item) => ({
    plainText: item.plain_text,
    href: item.href,
    annotations: item.annotations
  }));
};

export const getPlainText = (richText: RichTextItemResponse[] = []) =>
  richText.map((item) => item.plain_text).join('').trim();
