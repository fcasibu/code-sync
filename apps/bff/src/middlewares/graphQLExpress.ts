import type { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { RequestHandler } from 'express';
import type { PoolClient } from '@code-sync/api';
import { UserAPI } from '@code-sync/api';
import type { Context } from '../graphql/context';
import type { User } from '../graphql/types';

export const graphQLExpressMiddleware = (
  apolloServer: ApolloServer<Context>,
  poolClient: PoolClient,
): RequestHandler => {
  const userApi = new UserAPI<User>(poolClient);
  return expressMiddleware(apolloServer, {
    // eslint-disable-next-line @typescript-eslint/require-await -- context requires a Promise
    context: async () => {
      return {
        userApi,
      };
    },
  });
};
