import { notionClient } from './notionClient';

export const getPageBlocks = async (pageId: string) => {
  const response = await notionClient.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  return response.results.reduce((acc, val) => {
    acc[val.id] = val;
    return acc;
  }, {});
};
