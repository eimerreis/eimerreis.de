import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { verifySpotifyOAuthState } from '@/lib/spotify-admin/auth-cookies';
import {
  getSpotifyAdminAccountId,
  getSpotifyAdminTokenFilePath,
  getSpotifySessionSecret,
  getSpotifyTokenEncryptionSecret,
  SPOTIFY_ADMIN_OAUTH_STATE_COOKIE_NAME,
} from '@/lib/spotify-admin/config';
import { exchangeAuthorizationCode, fetchCurrentSpotifyUser } from '@/lib/spotify-admin/oauth';
import { clearSpotifyOAuthStateCookie, createSpotifySessionCookie } from '@/lib/spotify-admin/session';
import { writeEncryptedSpotifyToken } from '@/lib/spotify-admin/token-store';

const redirectToAdmin = (request: NextRequest, params: Record<string, string>) => {
  const url = new URL('/admin', request.url);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url;
};

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const error = requestUrl.searchParams.get('error');
  const code = requestUrl.searchParams.get('code');
  const state = requestUrl.searchParams.get('state');

  if (error) {
    return NextResponse.redirect(redirectToAdmin(request, { error: `Spotify denied access: ${error}` }));
  }

  if (!code || !state) {
    return NextResponse.redirect(redirectToAdmin(request, { error: 'Missing OAuth callback parameters.' }));
  }

  const sessionSecret = getSpotifySessionSecret();
  const encryptionSecret = getSpotifyTokenEncryptionSecret();

  if (!sessionSecret || !encryptionSecret) {
    return NextResponse.redirect(
      redirectToAdmin(request, { error: 'Spotify admin secrets are missing. Check server env variables.' }),
    );
  }

  const cookieStore = await cookies();
  const signedState = cookieStore.get(SPOTIFY_ADMIN_OAUTH_STATE_COOKIE_NAME)?.value;

  if (!verifySpotifyOAuthState(signedState, state, sessionSecret)) {
    const response = NextResponse.redirect(
      redirectToAdmin(request, { error: 'Invalid OAuth state. Please retry login.' }),
    );
    response.cookies.set(clearSpotifyOAuthStateCookie());
    return response;
  }

  try {
    const tokenResponse = await exchangeAuthorizationCode(code, request.nextUrl.origin);

    if (!tokenResponse.refresh_token) {
      throw new Error('Spotify did not return a refresh token. Ensure app has access and retry login.');
    }

    const profile = await fetchCurrentSpotifyUser(tokenResponse.access_token);
    const expectedAccountId = getSpotifyAdminAccountId();

    if (profile.id !== expectedAccountId) {
      throw new Error(`Authenticated Spotify account is ${profile.id}, expected ${expectedAccountId}.`);
    }

    await writeEncryptedSpotifyToken(getSpotifyAdminTokenFilePath(), encryptionSecret, {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiresAt: Date.now() + tokenResponse.expires_in * 1000,
      accountId: profile.id,
      scope: tokenResponse.scope ?? '',
      tokenType: tokenResponse.token_type ?? 'Bearer',
      updatedAt: Date.now(),
    });

    const response = NextResponse.redirect(redirectToAdmin(request, { connected: '1' }));
    response.cookies.set(createSpotifySessionCookie(profile.id));
    response.cookies.set(clearSpotifyOAuthStateCookie());

    return response;
  } catch (callbackError) {
    const response = NextResponse.redirect(
      redirectToAdmin(request, {
        error: callbackError instanceof Error ? callbackError.message : 'Spotify OAuth callback failed.',
      }),
    );
    response.cookies.set(clearSpotifyOAuthStateCookie());

    return response;
  }
}
