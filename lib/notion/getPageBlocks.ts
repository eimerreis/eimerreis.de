import 'server-only';

import type {
  BlockObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

import { notionClient } from './notionClient';
import { mapRichText } from './getPage';
import type { NotionBlockNode } from './types';

const getBlockData = (block: BlockObjectResponse) => {
  const data = block[block.type as keyof BlockObjectResponse] as Record<string, unknown>;
  return data ?? {};
};

const getImageUrl = (block: BlockObjectResponse) => {
  if (block.type !== 'image') return undefined;
  return block.image.type === 'external' ? block.image.external.url : block.image.file.url;
};

const mapBlock = async (block: BlockObjectResponse): Promise<NotionBlockNode> => {
  const data = getBlockData(block);
  const richText = (data.rich_text as RichTextItemResponse[] | undefined) ?? [];
  const caption = (data.caption as RichTextItemResponse[] | undefined) ?? [];
  const hasChildren = block.has_children;

  let children: NotionBlockNode[] = [];
  if (hasChildren && notionClient) {
    children = await getPageBlocks(block.id);
  }

  return {
    id: block.id,
    type: block.type,
    hasChildren,
    children,
    richText: mapRichText(richText),
    caption: mapRichText(caption),
    url:
      getImageUrl(block) ??
      (typeof data.url === 'string' ? data.url : undefined),
    language: typeof data.language === 'string' ? data.language : undefined,
    icon:
      block.type === 'callout' && block.callout.icon?.type === 'emoji'
        ? block.callout.icon.emoji
        : undefined
  };
};

export const getPageBlocks = async (blockId: string): Promise<NotionBlockNode[]> => {
  if (!notionClient) {
    return [];
  }

  const results: unknown[] = [];
  let cursor: string | undefined;

  do {
    const response = await notionClient.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor
    });

    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  const blocks = results.filter(
    (block: unknown): block is BlockObjectResponse =>
      block !== null && typeof block === 'object' && 'type' in block
  );

  return Promise.all(blocks.map(mapBlock));
};
