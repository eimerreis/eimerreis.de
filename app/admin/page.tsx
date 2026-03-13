import { getStoredSpotifyToken } from '@/lib/spotify-admin/client';
import { getSpotifyAdminSetupIssues } from '@/lib/spotify-admin/config';
import { getSpotifyAdminSession } from '@/lib/spotify-admin/session';

export const dynamic = 'force-dynamic';

type SearchParams = Record<string, string | string[] | undefined>;

const readParam = (params: SearchParams, key: string) => {
  const value = params[key];

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
};

const parseReport = (params: SearchParams) => {
  const scanned = Number(readParam(params, 'scanned') ?? '0');
  const matched = Number(readParam(params, 'matched') ?? '0');
  const madePublic = Number(readParam(params, 'madePublic') ?? '0');
  const alreadyPublic = Number(readParam(params, 'alreadyPublic') ?? '0');
  const skippedNotOwned = Number(readParam(params, 'skippedNotOwned') ?? '0');

  if (![scanned, matched, madePublic, alreadyPublic, skippedNotOwned].every((value) => Number.isFinite(value))) {
    return null;
  }

  return {
    scanned,
    matched,
    madePublic,
    alreadyPublic,
    skippedNotOwned,
  };
};

const successIcon = (
  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
    <path className="success-check" d="M3.5 8.3 6.7 11.3 12.7 4.7" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export default async function AdminPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const session = await getSpotifyAdminSession();

  const setupIssues = getSpotifyAdminSetupIssues();
  let token = null;
  let tokenError: string | null = null;

  if (setupIssues.length === 0) {
    try {
      token = await getStoredSpotifyToken();
    } catch (error) {
      tokenError = error instanceof Error ? error.message : 'Failed to read stored Spotify token.';
    }
  }

  const error = readParam(params, 'error');
  const connected = readParam(params, 'connected') === '1';
  const jobRan = readParam(params, 'job') === '1';
  const report = parseReport(params);

  return (
    <div className="pb-12 pt-2">
      <header className="reveal pb-10">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-[-0.03em] md:text-7xl">Spotify automation</h1>
        <p className="mt-5 max-w-3xl text-muted md:text-lg">
          Authorize your personal Spotify account, store an encrypted refresh token, and run the playlist publishing
          job.
        </p>
      </header>

      <section className="surface reveal-soft rounded-3xl p-6 md:p-8">
        <h2 className="font-display text-3xl tracking-tight">Status</h2>
        <div className="mt-4 space-y-3 text-sm text-muted">
          <p>
            Authenticated session:{' '}
            <span className="font-medium text-ink">{session ? `yes (${session.accountId})` : 'no'}</span>
          </p>
          <p>
            Stored token:{' '}
            <span className="font-medium text-ink">
              {token
                ? `available (updated ${new Date(token.updatedAt).toLocaleString('en')})`
                : tokenError
                  ? 'error'
                  : 'missing'}
            </span>
          </p>
          <p>
            Configured account:{' '}
            <span className="font-medium text-ink">{process.env.SPOTIFY_ADMIN_ACCOUNT_ID ?? 'eimerreis'}</span>
          </p>
        </div>

        {setupIssues.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-red-400/40 bg-red-100/60 p-4 text-sm text-red-900 dark:bg-red-900/20 dark:text-red-100">
            <p className="font-medium">Setup issues:</p>
            <ul className="mt-2 list-disc pl-5">
              {setupIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {tokenError ? (
          <div className="mt-6 rounded-2xl border border-red-400/40 bg-red-100/60 p-4 text-sm text-red-900 dark:bg-red-900/20 dark:text-red-100">
            {tokenError}
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-400/40 bg-red-100/60 p-4 text-sm text-red-900 dark:bg-red-900/20 dark:text-red-100">
            {error}
          </div>
        ) : null}

        {connected ? (
          <div className="success-badge mt-6 rounded-2xl border border-green-500/40 bg-green-100/70 p-4 text-sm text-green-900 dark:bg-green-900/20 dark:text-green-100">
            <p className="inline-flex items-center gap-2 font-medium">
              {successIcon}
              Spotify account connected successfully.
            </p>
            <p className="mt-1 text-green-900/80 dark:text-green-100/85">Ready to run the monthly publish pass.</p>
          </div>
        ) : null}

        {jobRan && report ? (
          <div className="success-badge mt-6 rounded-2xl border border-green-500/40 bg-green-100/70 p-4 text-sm text-green-900 dark:bg-green-900/20 dark:text-green-100">
            <p className="inline-flex items-center gap-2 font-medium">
              {successIcon}
              Monthly publish pass complete.
            </p>
            <p className="mt-1 text-green-900/80 dark:text-green-100/85">
              Scanned {report.scanned} playlists, matched {report.matched}, published {report.madePublic}, already
              public {report.alreadyPublic}, skipped not owned {report.skippedNotOwned}.
            </p>
          </div>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/api/admin/spotify/login"
            className="rounded-full border-2 border-accent/50 bg-accent/[0.12] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent/[0.18] active:scale-95"
          >
            Connect Spotify
          </a>

          {session ? (
            <form action="/api/admin/spotify/logout" method="post">
              <button
                type="submit"
                className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accentAlt/[0.45] hover:text-accentAlt active:scale-95"
              >
                Logout admin session
              </button>
            </form>
          ) : null}

          {session ? (
            <form action="/api/admin/spotify/publish-eimertunes?redirect=1" method="post">
              <button
                type="submit"
                className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accentAlt/[0.45] hover:text-accentAlt active:scale-95"
              >
                Run monthly job now
              </button>
            </form>
          ) : null}
        </div>
      </section>

      <section className="reveal delay-1 mt-8 surface rounded-3xl p-6 md:p-8">
        <h2 className="font-display text-2xl tracking-tight">Cron endpoint</h2>
        <p className="mt-3 text-sm text-muted">
          Trigger monthly via a scheduler by sending a POST request to
          <code className="ml-1 rounded bg-paperSoft px-1.5 py-0.5">/api/admin/spotify/publish-eimertunes</code>
          with an <code className="ml-1 rounded bg-paperSoft px-1.5 py-0.5">Authorization: Bearer ...</code> header
          using
          <code className="ml-1 rounded bg-paperSoft px-1.5 py-0.5">SPOTIFY_CRON_SECRET</code>.
        </p>
      </section>
    </div>
  );
}
