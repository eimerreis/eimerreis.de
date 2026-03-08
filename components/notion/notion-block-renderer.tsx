import type { ReactNode } from 'react';

import type { NotionBlockNode } from '@/lib/notion/types';
import { RichText } from './rich-text';

const renderNestedChildren = (children: NotionBlockNode[]) => {
  if (children.length === 0) {
    return null;
  }

  return <NotionBlockRenderer blocks={children} />;
};

const renderListItem = (block: NotionBlockNode) => {
  return (
    <li key={block.id} className="ml-5 pl-1">
      <RichText richText={block.richText} />
      {renderNestedChildren(block.children)}
    </li>
  );
};

const renderSingleBlock = (block: NotionBlockNode): ReactNode => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={block.id}>
          <RichText richText={block.richText} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 key={block.id}>
          <RichText richText={block.richText} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 key={block.id}>
          <RichText richText={block.richText} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={block.id}>
          <RichText richText={block.richText} />
        </h3>
      );
    case 'quote':
      return (
        <blockquote key={block.id}>
          <RichText richText={block.richText} />
        </blockquote>
      );
    case 'callout':
      return (
        <div key={block.id} className="surface my-6 rounded-2xl px-5 py-4 text-sm">
          <p className="m-0">
            {block.icon ? <span className="mr-2">{block.icon}</span> : null}
            <RichText richText={block.richText} />
          </p>
        </div>
      );
    case 'code':
      return (
        <pre key={block.id} className="overflow-x-auto rounded-xl px-4 py-3">
          <code>
            <RichText richText={block.richText} />
          </code>
        </pre>
      );
    case 'divider':
      return <hr key={block.id} />;
    case 'image':
      return (
        <figure key={block.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {block.url ? <img src={block.url} alt="" className="w-full rounded-2xl" /> : null}
          {block.caption?.length ? (
            <figcaption>
              <RichText richText={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    case 'bookmark':
      return block.url ? (
        <p key={block.id}>
          <a href={block.url} target="_blank" rel="noreferrer">
            {block.url}
          </a>
        </p>
      ) : null;
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return renderListItem(block);
    default:
      return block.richText?.length ? (
        <p key={block.id}>
          <RichText richText={block.richText} />
        </p>
      ) : null;
  }
};

const renderBlocks = (blocks: NotionBlockNode[]) => {
  const output: ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block.type === 'bulleted_list_item') {
      const grouped: NotionBlockNode[] = [block];
      while (blocks[index + 1]?.type === 'bulleted_list_item') {
        index += 1;
        grouped.push(blocks[index]);
      }
      output.push(
        <ul key={`ul-${grouped[0].id}`}>
          {grouped.map((item) => renderListItem(item))}
        </ul>
      );
      continue;
    }

    if (block.type === 'numbered_list_item') {
      const grouped: NotionBlockNode[] = [block];
      while (blocks[index + 1]?.type === 'numbered_list_item') {
        index += 1;
        grouped.push(blocks[index]);
      }
      output.push(
        <ol key={`ol-${grouped[0].id}`}>
          {grouped.map((item) => renderListItem(item))}
        </ol>
      );
      continue;
    }

    output.push(renderSingleBlock(block));
  }

  return output;
};

export const NotionBlockRenderer = ({ blocks }: { blocks: NotionBlockNode[] }) => {
  return <>{renderBlocks(blocks)}</>;
};
