import { NextRequest, NextResponse } from 'next/server';

import { getSpotifyCronSecret } from '@/lib/spotify-admin/config';
import { publishEimerTunesPlaylists } from '@/lib/spotify-admin/publish-eimertunes';
import { getSpotifyAdminSession } from '@/lib/spotify-admin/session';

export const runtime = 'nodejs';

const createUnauthorized = (message: string) => NextResponse.json({ ok: false, error: message }, { status: 401 });

const getBearerToken = (authorizationHeader: string | null) => {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    return null;
  }

  return authorizationHeader.slice('Bearer '.length).trim();
};

export async function POST(request: NextRequest) {
  const shouldRedirect = request.nextUrl.searchParams.get('redirect') === '1';
  const cronSecret = getSpotifyCronSecret();
  const bearerToken = getBearerToken(request.headers.get('authorization'));
  const session = await getSpotifyAdminSession();

  const hasValidCronToken = Boolean(cronSecret && bearerToken && bearerToken === cronSecret);
  const hasValidSession = Boolean(session);

  if (!hasValidCronToken && !hasValidSession) {
    if (shouldRedirect) {
      return NextResponse.redirect(new URL('/admin?error=Not+authorized+to+run+job', request.url), 303);
    }

    return createUnauthorized('Not authorized to run this job.');
  }

  try {
    const report = await publishEimerTunesPlaylists();

    if (shouldRedirect) {
      const url = new URL('/admin', request.url);
      url.searchParams.set('job', '1');
      url.searchParams.set('scanned', String(report.scanned));
      url.searchParams.set('matched', String(report.matched));
      url.searchParams.set('madePublic', String(report.madePublic));
      url.searchParams.set('alreadyPublic', String(report.alreadyPublic));
      url.searchParams.set('skippedNotOwned', String(report.skippedNotOwned));

      return NextResponse.redirect(url, 303);
    }

    return NextResponse.json({ ok: true, report });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to publish EimerTunes playlists.';

    if (shouldRedirect) {
      return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(message)}`, request.url), 303);
    }

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
