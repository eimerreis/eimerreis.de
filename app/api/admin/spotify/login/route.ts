import { NextRequest, NextResponse } from 'next/server';

import { createSpotifyOAuthStateCookieValue } from '@/lib/spotify-admin/auth-cookies';
import { getSpotifySessionSecret } from '@/lib/spotify-admin/config';
import { createSpotifyOAuthAuthorizeUrl } from '@/lib/spotify-admin/oauth';
import { createSpotifyOAuthStateCookie } from '@/lib/spotify-admin/session';

const redirectToAdmin = (request: NextRequest, params: Record<string, string>) => {
  const url = new URL('/admin', request.url);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url;
};

export async function GET(request: NextRequest) {
  const sessionSecret = getSpotifySessionSecret();

  if (!sessionSecret) {
    return NextResponse.redirect(
      redirectToAdmin(request, {
        error: 'Missing SPOTIFY_ADMIN_SESSION_SECRET or SPOTIFY_ADMIN_TOKEN_SECRET',
      }),
    );
  }

  try {
    const { state, signedState } = createSpotifyOAuthStateCookieValue(sessionSecret);
    const authorizeUrl = createSpotifyOAuthAuthorizeUrl(state, request.nextUrl.origin);
    const response = NextResponse.redirect(authorizeUrl);
    response.cookies.set(createSpotifyOAuthStateCookie(signedState));

    return response;
  } catch (error) {
    return NextResponse.redirect(
      redirectToAdmin(request, {
        error: error instanceof Error ? error.message : 'Spotify login failed',
      }),
    );
  }
}
