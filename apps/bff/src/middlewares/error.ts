import type { ErrorRequestHandler } from 'express';
import { logger } from '@code-sync/logger';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const errors = Array.isArray(err) ? err : [err];
  logger.error(
    { errors },
    'Something unexpected went wrong with the incoming request.',
  );
  res.status(200).json({
    data: null,
    errors,
  });
};
