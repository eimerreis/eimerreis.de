import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto my-16 max-w-3xl">
      <div className="surface rounded-[2rem] border-accent/[0.5] bg-gradient-to-r from-accent/[0.1] via-paperSoft to-accentAlt/[0.1] px-6 py-10 md:px-10 md:py-12">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl tracking-[-0.02em] md:text-5xl">
          This page slipped backstage.
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Could be unpublished, moved, or typed with one letter off. Let&apos;s get you back to somewhere worth opening.
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">No dead ends. Just better routes.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border-2 border-accent/50 bg-accent/[0.12] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent/[0.18] active:scale-95"
          >
            Go home
          </Link>
          <Link
            href="/writing"
            className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accent/[0.45] hover:text-accent active:scale-95"
          >
            Read writing
          </Link>
          <Link
            href="/playlists"
            className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accentAlt/[0.45] hover:text-accentAlt active:scale-95"
          >
            Browse playlists
          </Link>
        </div>
      </div>
    </section>
  );
}
