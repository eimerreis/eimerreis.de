import classNames from 'classnames';

import type { RichTextSpan } from '@/lib/notion/types';

const AnnotatedText = ({ span }: { span: RichTextSpan }) => {
  const className = classNames({
    'font-semibold': span.annotations.bold,
    italic: span.annotations.italic,
    underline: span.annotations.underline,
    'line-through': span.annotations.strikethrough,
    'rounded border border-line/80 bg-accentSoft/40 px-1 py-0.5 font-mono text-[0.92em]': span.annotations.code,
  });

  if (span.href) {
    return (
      <a
        href={span.href}
        target="_blank"
        rel="noreferrer"
        className={classNames(className, 'text-accent underline decoration-accent/45 underline-offset-4')}
      >
        {span.plainText}
      </a>
    );
  }

  return <span className={className}>{span.plainText}</span>;
};

export const RichText = ({ richText }: { richText?: RichTextSpan[] }) => {
  if (!richText || richText.length === 0) {
    return null;
  }

  return (
    <>
      {richText.map((span, index) => (
        <AnnotatedText key={`${span.plainText}-${index}`} span={span} />
      ))}
    </>
  );
};
