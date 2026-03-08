import Image from 'next/image';

import type { Playlist } from '@/lib/notion/types';

export const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <article className="surface overflow-hidden rounded-3xl hover:-translate-y-1">
      <a href={playlist.href} target="_blank" rel="noreferrer" className="block p-4 md:p-5">
        <div className="flex items-center gap-4">
          {playlist.image ? (
            <Image
              src={playlist.image}
              alt={playlist.name}
              width={100}
              height={100}
              className="h-16 w-16 rounded-xl object-cover md:h-20 md:w-20"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accentSoft/40 text-xs uppercase tracking-[0.14em] text-accent md:h-20 md:w-20">
              Mix
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-[1.9rem] leading-tight tracking-tight text-ink">
              {playlist.name}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
              {playlist.totalTracks} tracks
            </p>
          </div>
        </div>
        {playlist.description ? (
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">{playlist.description}</p>
        ) : null}
      </a>
    </article>
  );
};
