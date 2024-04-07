import { vi } from 'vitest';
import type { PrismaClient } from '@code-sync/db';
import { prismaClient } from '../config';
import type { Application } from '../server';
import { startServer } from '../server';

type UnMaybe<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

export const testHelper = () => {
  let app: Application | undefined;
  let prisma: PrismaClient | undefined;

  const setup = async () => {
    vi.useFakeTimers();
    prisma = prismaClient();
    app = await startServer({ port: 0, prismaClient: prisma });
  };

  const teardown = async () => {
    vi.useRealTimers();
    await app?.apolloServer?.stop();
    await prisma?.$disconnect();
    app?.expressServer?.close();
  };

  return {
    setup,
    teardown,
    get app() {
      if (!app)
        throw new Error(
          '`setup` in the testHelper was not invoked. Invoke the `setup` of `testHelper` in either `beforeEach` or `beforeAll`',
        );

      return app as UnMaybe<Application>;
    },
    get prismaClient() {
      if (!prisma)
        throw new Error(
          '`setup` in the testHelper was not invoked. Invoke the `setup` of `testHelper` in either `beforeEach` or `beforeAll`',
        );

      return prisma;
    },
  };
};
