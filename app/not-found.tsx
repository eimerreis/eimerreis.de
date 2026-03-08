import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="surface mx-auto my-20 max-w-xl rounded-3xl px-6 py-10 text-center">
      <p className="text-xs uppercase tracking-[0.14em] text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">
        The page does not exist anymore or has not been published yet.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full border border-line px-5 py-2 text-xs uppercase tracking-[0.14em] text-muted transition hover:border-accent/35 hover:text-accent"
      >
        Back home
      </Link>
    </div>
  );
}
