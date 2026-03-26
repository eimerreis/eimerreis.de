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
    <li key={block.id} className="ml-5 pl-2 marker:text-accent font-medium">
      <RichText richText={block.richText} />
      {renderNestedChildren(block.children)}
    </li>
  );
};

const renderSingleBlock = (block: NotionBlockNode): ReactNode => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={block.id} className="font-medium text-ink/90 leading-relaxed mb-6">
          <RichText richText={block.richText} />
        </p>
      );
    case 'heading_1':
      return (
        <h1
          key={block.id}
          className="font-display text-4xl font-bold uppercase tracking-tight mt-16 mb-8 border-b-2 border-ink pb-4"
        >
          <RichText richText={block.richText} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          key={block.id}
          className="font-display text-3xl font-bold tracking-tight mt-12 mb-6 text-ink flex items-center gap-4"
        >
          <span className="w-6 h-6 bg-accent rounded-full inline-block shrink-0" />
          <RichText richText={block.richText} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={block.id} className="font-display text-xl font-bold uppercase tracking-widest mt-10 mb-4 text-ink/80">
          <RichText richText={block.richText} />
        </h3>
      );
    case 'quote':
      return (
        <blockquote
          key={block.id}
          className="border-l-4 border-accent pl-6 py-2 my-8 font-display text-2xl italic text-ink/90"
        >
          <RichText richText={block.richText} />
        </blockquote>
      );
    case 'callout':
      return (
        <div key={block.id} className="my-8 border-2 border-ink bg-paperSoft p-6 flex gap-4 font-medium items-start">
          {block.icon ? <span className="text-2xl shrink-0 bg-paper border border-line p-2">{block.icon}</span> : null}
          <div className="pt-1">
            <RichText richText={block.richText} />
          </div>
        </div>
      );
    case 'code':
      return (
        <pre
          key={block.id}
          className="overflow-x-auto border-2 border-ink bg-ink text-paper px-6 py-5 my-8 shadow-[8px_8px_0_rgb(var(--color-accent))]"
        >
          <code className="font-mono text-sm">
            <RichText richText={block.richText} />
          </code>
        </pre>
      );
    case 'divider':
      return <hr key={block.id} className="my-12 border-t-2 border-line/50" />;
    case 'image':
      return (
        <figure key={block.id} className="my-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {block.url ? (
            <img
              src={block.url}
              alt=""
              className="w-full border-2 border-ink grayscale hover:grayscale-0 transition-all duration-700"
            />
          ) : null}
          {block.caption?.length ? (
            <figcaption className="mt-4 font-display text-xs font-bold uppercase tracking-widest text-muted border-l-2 border-line pl-4">
              <RichText richText={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    case 'bookmark':
      return block.url ? (
        <div key={block.id} className="my-8 border-2 border-ink p-4 hover:bg-paperSoft transition-colors">
          <a
            href={block.url}
            target="_blank"
            rel="noreferrer"
            className="font-display font-bold uppercase tracking-widest text-sm flex items-center justify-between"
          >
            <span className="truncate pr-4">{block.url}</span>
            <span className="text-accent shrink-0">↗</span>
          </a>
        </div>
      ) : null;
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return renderListItem(block);
    default:
      return block.richText?.length ? (
        <p key={block.id} className="font-medium text-ink/90 leading-relaxed mb-6">
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
        <ul key={`ul-${grouped[0].id}`} className="list-none space-y-3 my-6 border-l-2 border-line/30 ml-2">
          {grouped.map((item) => renderListItem(item))}
        </ul>,
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
        <ol key={`ol-${grouped[0].id}`} className="list-decimal space-y-3 my-6 pl-6 font-display font-bold text-ink/80">
          {grouped.map((item) => renderListItem(item))}
        </ol>,
      );
      continue;
    }

    output.push(renderSingleBlock(block));
  }

  return output;
};

export const NotionBlockRenderer = ({ blocks }: { blocks: NotionBlockNode[] }) => {
  return <div className="space-y-2">{renderBlocks(blocks)}</div>;
};
