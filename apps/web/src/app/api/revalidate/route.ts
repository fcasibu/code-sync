import { strict as assert } from 'node:assert';
import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { logger } from '@code-sync/logger';
import { isAuthorized, sendUnauthorizedResponse } from '@/utils';

export const POST = async (req: NextRequest) => {
  if (!isAuthorized(req)) {
    return sendUnauthorizedResponse();
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;

    assert(
      Array.isArray(body.tags),
      'body must contain tags, an array of strings',
    );
    assert(
      body.tags.every((tag) => typeof tag === 'string'),
      'Invalid tag was present',
    );

    body.tags.forEach((tag: string) => {
      revalidateTag(tag);
    });

    return Response.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (e) {
    logger.error(e, 'Something went wrong in api/revalidate');

    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: (e as Error).message,
    });
  }
};
