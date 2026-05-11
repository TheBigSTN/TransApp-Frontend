import { NextRequest, NextResponse } from 'next/server';

const requestLimits = new Map<string, { count: number, lastRequest: number }>();
const allowedIps = ['::1', "82.79.210.60"];

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
  const limit = 10000;
  const windowSize = 60 * 60 * 1000;

  const currentTime = Date.now()

  const userStats = requestLimits.get(ip)

  if (userStats && !allowedIps.includes(ip)) {
    const { count, lastRequest } = userStats

    if (currentTime - lastRequest > windowSize) {
      requestLimits.set(ip, { count: 1, lastRequest: currentTime })
    } else if (count >= limit) {
      return new NextResponse('Too many requests', { status: 429 })
    } else {
      userStats.count++
      requestLimits.set(ip, userStats)
    }
  } else {
    requestLimits.set(ip, { count: 1, lastRequest: currentTime })
  }

  const isSignedIn = request.cookies.has('accessToken');
  const isSigninPage = request.nextUrl.pathname.startsWith('/account/signin');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const callbackUrl = request.nextUrl.searchParams.get('callback');

  if (!isSignedIn && isDashboardPage) {
    return NextResponse.redirect(new URL(`/account/signin?callback=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
  }

  if (isSignedIn && isSigninPage) {
    const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-path', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}