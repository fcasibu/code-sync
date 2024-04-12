import { getAccessToken } from '@auth0/nextjs-auth0';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { INTERNAL_HEADER_REVALIDATE_KEY } from '@/constants';
import { env } from '@/env';
import { isAuthorized, sendUnauthorizedResponse } from '@/utils';

export const POST = async (req: NextRequest) => {
  if (!isAuthorized(req)) {
    return sendUnauthorizedResponse();
  }

  const { accessToken } = await getAccessToken().catch(() => ({
    accessToken: '',
  }));

  try {
    const response = await fetch(env.BFF_URL, {
      method: 'POST',
      headers: {
        ...req.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: Number(req.headers.get(INTERNAL_HEADER_REVALIDATE_KEY)),
      },
      body: JSON.stringify(await req.json()),
    });

    return NextResponse.json(await response.json());
  } catch (e) {
    return NextResponse.json({ errors: [e] }, { status: 500 });
  }
};
