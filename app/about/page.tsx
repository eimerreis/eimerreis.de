import type { Metadata } from 'next';

import { ClayAvatar } from '@/components/site/clay-avatar';

export const metadata: Metadata = {
  title: 'About',
  description: 'Software developer, musician, and event curator.',
};

const focusAreas = ['Frontend architecture', 'Playful interaction design', 'Music curation', 'Boutique events'];

export default function AboutPage() {
  return (
    <div className="pb-16 pt-2">
      <header className="reveal pb-10">
        <p className="eyebrow">About</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-[-0.03em] md:text-7xl">
          Developer by trade, curator by instinct, <span className="rainbow-word">builder of scenes</span>.
        </h1>
      </header>

      <section className="relative grid gap-7 md:grid-cols-[1.04fr_0.96fr] md:items-end">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-[32rem] w-[52%] overflow-hidden md:block">
          <div className="avatar-shell avatar-drift absolute bottom-32 right-1 z-10 w-[16rem]">
            <ClayAvatar />
            <div className="avatar-easteregg pointer-events-none absolute -right-4 top-4 rounded-full border border-accent/40 bg-paper/85 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-accent">
              hi there
            </div>
          </div>
        </div>

        <div className="stagger-children relative z-20 space-y-4 reveal delay-1">
          <article className="surface rounded-[1.9rem] px-6 py-6 md:px-7 md:py-7">
            <h2 className="font-display text-3xl tracking-tight">What I do</h2>
            <p className="mt-4 text-muted">
              I design and ship digital products with a bias for clear UX and strong editorial tone. Most days, that
              means Next.js, TypeScript, and turning messy ideas into interfaces that feel alive.
            </p>
          </article>

          <article className="surface rounded-[1.9rem] px-6 py-6 md:px-7 md:py-7">
            <h2 className="font-display text-3xl tracking-tight">Outside the browser</h2>
            <p className="mt-4 text-muted">
              I DJ, produce electronic music, and co-run{' '}
              <a
                href="https://offday.events"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-accent/45 decoration-2 underline-offset-4"
              >
                offday.events
              </a>
              . We host intimate events in unusual locations and build tiny worlds for one night.
            </p>
          </article>

          <article className="surface rounded-[1.9rem] px-6 py-6 md:px-7 md:py-7">
            <h2 className="font-display text-3xl tracking-tight">Current focus</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {focusAreas.map((area, index) => (
                <li
                  key={area}
                  className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] ${
                    index % 2 === 0
                      ? 'border-accent/45 bg-accent/10 text-accent'
                      : 'border-accentAlt/[0.45] bg-accentAlt/10 text-accentAlt'
                  }`}
                >
                  {area}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <aside className="surface !bg-[rgb(var(--color-paper-soft))] reveal-soft delay-2 relative z-20 rounded-[1.8rem] px-6 py-7 md:mb-10 md:ml-auto md:max-w-[22rem]">
          <p className="eyebrow">Based in Freudenstadt</p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight">
            Forest-side builder, internet-first mindset.
          </h2>
          <p className="mt-4 text-sm text-muted">
            I work remotely from the Black Forest and love products that feel warm, fast, and unmistakably human.
          </p>
        </aside>
      </section>
    </div>
  );
}
