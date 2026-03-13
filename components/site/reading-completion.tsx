'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { PostSummary } from '@/lib/notion/types';

const completionMessages = [
  'You made it to the final line.',
  'Thanks for staying with the whole thought.',
  'End of note. Start of the next rabbit hole.',
  'That was a full lap through the idea.',
];

const hashValue = (value: string) => {
  return value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
};

type ReadingCompletionProps = {
  slug: string;
  nextPost: PostSummary | null;
  previousPost: PostSummary | null;
};

export const ReadingCompletion = ({ slug, nextPost, previousPost }: ReadingCompletionProps) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  const nextSuggestion = nextPost ?? previousPost;

  const message = useMemo(() => {
    return completionMessages[hashValue(slug) % completionMessages.length];
  }, [slug]);

  useEffect(() => {
    const triggerNode = triggerRef.current;

    if (!triggerNode) {
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(triggerNode);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={triggerRef} className="mx-auto mt-12 max-w-5xl">
      <div
        className={`completion-card surface rounded-[1.8rem] border-accent/[0.45] bg-gradient-to-r from-accent/[0.11] via-paperSoft to-accentAlt/[0.12] px-6 py-7 md:px-8 md:py-8 ${
          revealed ? 'completion-card-visible' : ''
        }`}
      >
        <p className="eyebrow">End of note</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl tracking-tight md:text-4xl">{message}</h2>
        <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
          If this resonated, there is more where this came from.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {nextSuggestion ? (
            <Link
              href={`/writing/${nextSuggestion.slug}`}
              className="rounded-full border-2 border-accent/50 bg-accent/[0.12] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent/[0.18] active:scale-95"
            >
              Keep reading
            </Link>
          ) : (
            <Link
              href="/writing"
              className="rounded-full border-2 border-accent/50 bg-accent/[0.12] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent/[0.18] active:scale-95"
            >
              Open archive
            </Link>
          )}
          <Link
            href="/playlists"
            className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accentAlt/[0.45] hover:text-accentAlt active:scale-95"
          >
            Play something
          </Link>
        </div>
      </div>
    </section>
  );
};
