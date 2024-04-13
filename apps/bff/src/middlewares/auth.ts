import type { RequestHandler } from 'express';
import { verifyToken } from '@/utils';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  res.locals.isAuthorized = false;
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    const decoded = await verifyToken(token);
    res.locals.isAuthorized = Boolean(decoded.sub);
  }

  next();
};
