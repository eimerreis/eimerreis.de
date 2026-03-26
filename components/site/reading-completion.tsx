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
    <section ref={triggerRef} className="mx-auto mt-24 max-w-4xl px-6 md:px-0">
      <div
        className={`completion-card border-2 border-ink bg-paper p-8 md:p-12 transition-all duration-700 ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] w-8 bg-accent" />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">End of note</p>
        </div>

        <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">{message}</h2>
        <p className="mt-6 text-lg font-medium text-muted/90 max-w-xl">
          If this resonated, there is more where this came from.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {nextSuggestion ? (
            <Link
              href={`/writing/${nextSuggestion.slug}`}
              className="group relative flex h-12 items-center justify-center overflow-hidden bg-ink px-6 font-display text-xs font-bold uppercase tracking-widest text-paper transition-all hover:bg-accent"
            >
              <span className="relative z-10 transition-transform group-hover:-translate-y-10">Keep reading</span>
              <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-10 transition-transform group-hover:translate-y-0">
                Keep reading
              </span>
            </Link>
          ) : (
            <Link
              href="/writing"
              className="group relative flex h-12 items-center justify-center overflow-hidden bg-ink px-6 font-display text-xs font-bold uppercase tracking-widest text-paper transition-all hover:bg-accent"
            >
              <span className="relative z-10 transition-transform group-hover:-translate-y-10">Open archive</span>
              <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-10 transition-transform group-hover:translate-y-0">
                Open archive
              </span>
            </Link>
          )}
          <Link
            href="/playlists"
            className="group relative flex h-12 items-center justify-center overflow-hidden border-2 border-ink bg-transparent px-6 font-display text-xs font-bold uppercase tracking-widest text-ink transition-all hover:bg-paperSoft"
          >
            <span className="relative z-10">Play something</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
