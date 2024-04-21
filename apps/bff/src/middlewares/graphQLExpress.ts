import type { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { RequestHandler } from 'express';
import {
  CodingProblemAPI,
  CodingProblemSessionAPI,
  SessionSpectatorAPI,
  SubmissionAPI,
  TestCaseAPI,
  UserAPI,
  Vm2TestRunner,
} from '@code-sync/api';
import type { PrismaClient } from '@code-sync/db';
import type { Context } from '@/graphql';

export const graphQLExpressMiddleware = (
  apolloServer: ApolloServer<Context>,
  prismaClient: PrismaClient,
): RequestHandler => {
  const userApi = new UserAPI(prismaClient);
  const codingProblemApi = new CodingProblemAPI(prismaClient);
  const codingProblemSessionApi = new CodingProblemSessionAPI(prismaClient);
  const sessionSpectatorApi = new SessionSpectatorAPI(prismaClient);
  const submissionApi = new SubmissionAPI(
    prismaClient,
    codingProblemApi,
    new Vm2TestRunner(),
  );
  const testCaseApi = new TestCaseAPI(prismaClient);

  return expressMiddleware(apolloServer, {
    context: async ({ res }) => {
      return Promise.resolve({
        codingProblemSessionApi,
        codingProblemApi,
        sessionSpectatorApi,
        submissionApi,
        testCaseApi,
        userApi,
        isAuthorized: res.locals.isAuthorized,
      });
    },
  });
};
