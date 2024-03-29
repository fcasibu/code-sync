import createMiddleware from 'next-intl/middleware';
import type { NextRequest, NextResponse } from 'next/server';
import { locales } from './locale-helper';

export function createIntlMiddleware(request: NextRequest): NextResponse {
  const defaultLocale = 'en';
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localeDetection: false,
    localePrefix: 'as-needed',
  });

  const response = handleI18nRouting(request);
  response.headers.set('x-default-locale', defaultLocale);

  return response;
}
