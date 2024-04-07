import { getAccessToken } from '@auth0/nextjs-auth0';
import type { NextRequest } from 'next/server';
import { env } from '@/env';

export const POST = async (req: NextRequest) => {
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
        revalidate: Number(req.headers.get('revalidate')),
      },
      body: JSON.stringify(await req.json()),
    });

    return Response.json(await response.json());
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
};
