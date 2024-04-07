import type { Server } from 'node:http';
import { ApolloServer } from '@apollo/server';
import { addResolversToSchema } from '@graphql-tools/schema';
import 'dotenv/config';
import express from 'express';
import type { PrismaClient } from '@code-sync/db';
import logger from '@code-sync/logger';
import type { Context } from './graphql';
import { resolvers } from './graphql';
import { schema } from './graphql/schemas';
import {
  authMiddleware,
  checkHealthMiddleware,
  corsMiddleware,
  errorMiddleware,
  graphQLExpressMiddleware,
  loggerMiddleware,
} from './middlewares';
import { urlForHTTPServer } from './utils';

export interface Application {
  apolloServer: ApolloServer<Context> | null;
  url: string;
  expressServer: Server | null;
}

interface StartServerProps {
  port: number;
  prismaClient: PrismaClient;
  whiteListedDomains?: string[];
}

export const startServer = async ({
  port,
  prismaClient,
  whiteListedDomains = [],
}: StartServerProps): Promise<Application> => {
  try {
    const apolloServer = new ApolloServer<Context>({
      schema: addResolversToSchema({ schema, resolvers }),
      introspection: process.env.NODE_ENV !== 'production',
    });

    await apolloServer.start();

    const app = express();

    app.use(loggerMiddleware());
    app.use(corsMiddleware(whiteListedDomains));
    app.use(express.json());
    app.use(authMiddleware);

    app.get('/health', checkHealthMiddleware);
    app.use('/', graphQLExpressMiddleware(apolloServer, prismaClient));

    app.use(errorMiddleware);

    const expressServer = app.listen(port);

    return {
      apolloServer,
      url: urlForHTTPServer(expressServer),
      expressServer,
    };
  } catch (e) {
    logger.error(e, 'Something went wrong with starting the server');
    return { apolloServer: null, url: '', expressServer: null };
  }
};
