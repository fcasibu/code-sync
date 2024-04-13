import type { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { RequestHandler } from 'express';
import { DocumentAPI, RoomAPI, SpectatorAPI, UserAPI } from '@code-sync/api';
import type { PrismaClient } from '@code-sync/db';
import type { Context } from '@/graphql';

export const graphQLExpressMiddleware = (
  apolloServer: ApolloServer<Context>,
  prismaClient: PrismaClient,
): RequestHandler => {
  const userApi = new UserAPI(prismaClient);
  const roomApi = new RoomAPI(prismaClient);
  const documentApi = new DocumentAPI(prismaClient);
  const spectatorApi = new SpectatorAPI(prismaClient);

  return expressMiddleware(apolloServer, {
    context: ({ res }) => {
      return Promise.resolve({
        documentApi,
        roomApi,
        spectatorApi,
        userApi,
        isAuthorized: res.locals.isAuthorized,
      });
    },
  });
};
