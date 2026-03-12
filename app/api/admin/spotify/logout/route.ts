import { NextRequest, NextResponse } from 'next/server';

import { clearSpotifySessionCookie } from '@/lib/spotify-admin/session';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin', request.url), 303);
  response.cookies.set(clearSpotifySessionCookie());

  return response;
}
