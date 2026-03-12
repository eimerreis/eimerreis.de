import Image from 'next/image';

import type { Playlist } from '@/lib/notion/types';

export const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <article className="surface overflow-hidden rounded-3xl">
      <a href={playlist.href} target="_blank" rel="noreferrer" className="group block p-4 md:p-5">
        <div className="flex items-center gap-4">
          {playlist.image ? (
            <Image
              src={playlist.image}
              alt={playlist.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accentSoft/40 text-xs uppercase tracking-[0.14em] text-accent">
              Mix
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-2xl leading-tight tracking-tight text-ink">{playlist.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">{playlist.totalTracks} tracks</p>
          </div>
        </div>
        {playlist.description ? (
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">{playlist.description}</p>
        ) : null}
      </a>
    </article>
  );
};
