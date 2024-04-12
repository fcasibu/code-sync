import type { RequestHandler } from 'express';
import type { PrismaClient } from '@code-sync/db';

export const checkHealthMiddleware =
  (prisma: PrismaClient): RequestHandler =>
  async (_req, res, _next) => {
    await prisma.$queryRaw`SELECT 1`;
    res.sendStatus(200);
  };
