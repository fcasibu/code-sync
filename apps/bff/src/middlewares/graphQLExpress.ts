import type { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { RequestHandler } from 'express';
import { UserAPI } from '@code-sync/api';
import type { PrismaClient } from '@code-sync/db';
import type { Context } from '../graphql/context';

export const graphQLExpressMiddleware = (
  apolloServer: ApolloServer<Context>,
  prismaClient: PrismaClient,
): RequestHandler => {
  const userApi = new UserAPI(prismaClient);
  return expressMiddleware(apolloServer, {
    // eslint-disable-next-line @typescript-eslint/require-await -- context requires a Promise
    context: async () => {
      return {
        userApi,
      };
    },
  });
};
