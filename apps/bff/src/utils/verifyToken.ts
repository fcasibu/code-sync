import { promisify } from 'node:util';
import { strict as assert } from 'assert';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import { logger } from '@code-sync/logger';
import { DeferredPromise } from './deferredPromise';

export const verifyToken = (token: string) => {
  const client = new JwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  const deferredPromise = new DeferredPromise<jwt.JwtPayload>();

  const getSigningKey = promisify(client.getSigningKey);

  const getJwksClientKey = async (
    header: jwt.JwtHeader,
    callback: jwt.SigningKeyCallback,
  ) => {
    const key = await getSigningKey(header.kid);
    callback(null, key?.getPublicKey());
  };

  jwt.verify(
    token,
    getJwksClientKey,
    getJwtVerifyOptions(),
    (error, decoded) => {
      if (error) {
        logger.error(error, 'Was unable to verify token');
        deferredPromise.resolve({});
        return;
      }

      deferredPromise.resolve(decoded as JwtPayload);
    },
  );

  return deferredPromise.promise;
};

const getJwtVerifyOptions = (): jwt.VerifyOptions => {
  const { AUTH0_AUDIENCE, AUTH0_DOMAIN } = process.env;

  assert(AUTH0_AUDIENCE, 'AUTH0_AUDIENCE is required environment variable.');
  assert(AUTH0_DOMAIN, 'AUTH0_DOMAIN is required environment variable.');

  return {
    audience: AUTH0_AUDIENCE,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
  };
};
