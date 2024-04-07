import { type NextRequest, NextResponse } from 'next/server';
import { INTERNAL_HEADER_API_KEY } from '@/constants';
import { env } from '@/env';

export const isAuthorized = (req: NextRequest) =>
  req.headers.get(INTERNAL_HEADER_API_KEY) ===
  env.INTERNAL_HEADER_API_KEY_VALUE;

export const sendUnauthorizedResponse = () =>
  NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
