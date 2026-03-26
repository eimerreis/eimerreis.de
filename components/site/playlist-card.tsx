import Image from 'next/image';

import type { Playlist } from '@/lib/notion/types';

export const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <article className="group block h-full w-full bg-paperSoft border border-line p-6 transition-all hover:bg-paper hover:border-accentAlt/50">
      <a href={playlist.href} target="_blank" rel="noreferrer" className="flex h-full flex-col justify-between gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-20 w-20 overflow-hidden shrink-0 group-hover:scale-[1.02] transition-transform duration-500">
            {playlist.image ? (
              <Image
                src={playlist.image}
                alt={playlist.name}
                fill
                sizes="80px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-line/20 font-display text-xs font-bold uppercase tracking-widest text-ink">
                Mix
              </div>
            )}
            <div className="absolute inset-0 border border-ink/10 mix-blend-overlay"></div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-display text-[10px] font-bold uppercase tracking-widest text-muted border border-line px-2 py-1">
              {playlist.totalTracks} TRKS
            </span>
          </div>
        </div>

        <div>
          <p className="font-display text-2xl font-light leading-tight tracking-tight text-ink group-hover:text-accentAlt transition-colors">
            {playlist.name}
          </p>
          {playlist.description ? (
            <p className="mt-3 line-clamp-2 text-sm text-muted/80">{playlist.description}</p>
          ) : null}
        </div>
      </a>
    </article>
  );
};
