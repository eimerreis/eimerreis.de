import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="surface mx-auto my-20 max-w-2xl rounded-[2rem] px-6 py-10 text-center md:px-10 md:py-12">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-[-0.02em] md:text-5xl">Page not found</h1>
      <p className="mt-4 text-muted">The page does not exist anymore or has not been published yet.</p>
      <Link
        href="/"
        className="mt-7 inline-block rounded-full border-2 border-line bg-paper px-5 py-2 text-xs uppercase tracking-[0.14em] text-muted transition hover:border-accent/[0.45] hover:text-accent active:scale-95"
      >
        Back home
      </Link>
    </div>
  );
}
