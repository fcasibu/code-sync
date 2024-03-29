import type { ErrorRequestHandler } from 'express';
import type { GraphQLError } from 'graphql';
import logger from '@code-sync/logger';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(
    err,
    'Something unexpected went wrong with the incoming request.',
  );
  res.status(200).json({
    data: null,
    error: err as GraphQLError,
  });
};
