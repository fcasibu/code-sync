import type { Server } from 'node:http';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import 'dotenv/config';
import express from 'express';
import type { PoolClient } from '@code-sync/api';
import logger from '@code-sync/logger';
import type { Context } from './graphql';
import { resolvers } from './graphql';
import { typeDefs } from './graphql/schemas';
import {
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
  poolClient: PoolClient;
  whiteListedDomains?: string[];
}

export const startServer = async ({
  port,
  poolClient,
  whiteListedDomains = [],
}: StartServerProps): Promise<Application> => {
  try {
    const apolloServer = new ApolloServer<Context>({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      introspection: process.env.NODE_ENV !== 'production',
    });

    await apolloServer.start();

    const app = express();

    app.use(loggerMiddleware);
    app.use(corsMiddleware(whiteListedDomains));
    app.use(express.json());

    app.get('/health', checkHealthMiddleware);
    app.use('/', graphQLExpressMiddleware(apolloServer, poolClient));

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
