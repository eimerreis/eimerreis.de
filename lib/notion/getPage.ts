import {
  BlockObjectResponse,
  PageObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';

export const getPage = async (pageId: string) => {
  const response = await notionClient.pages.retrieve({ page_id: pageId });
  return response;
};

export const getFlatNotionPage = async (
  pageId: string
): Promise<NotionPage> => {
  const page = (await notionClient.pages.retrieve({
    page_id: pageId,
  })) as PageObjectResponse;
  const title = extractTitle(page);
  const content = await extractContent(pageId);

  return { id: pageId, title, content };
};

export const extractTitle = (page: PageObjectResponse): string => {
  // Assuming the title is in the first text block
  const titleBlock = (
    page.properties.Name as unknown as TitlePropertyItemObjectResponse
  ).title[0];
  return titleBlock ? titleBlock.plain_text : 'No Title';
};

const extractContent = async (blockId: string): Promise<NotionBlock[]> => {
  const contentBlocks = await notionClient.blocks.children.list({
    block_id: blockId,
  });
  return contentBlocks.results.map((block: BlockObjectResponse) => ({
    type: block.type,
    text: block[block.type].text[0]?.plain_text || '',
  }));
};
