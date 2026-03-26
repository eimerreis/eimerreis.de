import Image from 'next/image';

import type { Playlist } from '@/lib/notion/types';

export const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <article className="group relative flex flex-col py-8 border-b border-line hover:bg-paperSoft/50 transition-colors -mx-6 px-6 md:mx-0 md:px-6">
      <a
        href={playlist.href}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col md:flex-row md:items-center gap-6 before:absolute before:inset-0"
      >
        <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden shrink-0 group-hover:scale-[1.02] transition-transform duration-500">
          {playlist.image ? (
            <Image
              src={playlist.image}
              alt={playlist.name}
              fill
              sizes="96px"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-line/20 font-display text-xs font-bold uppercase tracking-widest text-ink">
              Mix
            </div>
          )}
          <div className="absolute inset-0 border border-ink/10 mix-blend-overlay"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div className="flex flex-col gap-1 md:gap-2">
            <h3 className="font-display text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight text-ink group-hover:text-accentAlt transition-colors">
              {playlist.name}
            </h3>
            {playlist.description ? (
              <p className="text-base md:text-lg text-muted/90 font-medium leading-relaxed max-w-xl">
                {playlist.description}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-4 shrink-0 mt-2 md:mt-0">
            <span className="font-display text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted bg-paper border border-line px-3 py-1">
              {playlist.totalTracks} TRKS
            </span>
            <span className="text-accentAlt opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden md:block">
              &rarr;
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};
