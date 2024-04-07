import type { NextRequest, NextResponse } from 'next/server';
import { createIntlMiddleware } from '@code-sync/translations';

export default function middleware(request: NextRequest): NextResponse {
  const response = createIntlMiddleware(request);

  return response;
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
