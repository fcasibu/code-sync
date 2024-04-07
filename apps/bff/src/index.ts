import { logger } from '@code-sync/logger';
import { prismaClient } from './config';
import { startServer } from './server';
import { isDefined } from './utils';

const whiteListedDomains = [
  process.env.CLIENT_ORIGIN,
  process.env.SERVER_ORIGIN,
].filter(isDefined);

const { url } = await startServer({
  port: Number(process.env.PORT),
  prismaClient: prismaClient(),
  whiteListedDomains,
});

if (url) {
  logger.info(`⚡ Server has started at ${url}`);
}
