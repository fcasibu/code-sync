import type { RequestHandler } from 'express';

export const checkHealthMiddleware: RequestHandler = (_req, res, _next) => {
  res.sendStatus(200);
};
