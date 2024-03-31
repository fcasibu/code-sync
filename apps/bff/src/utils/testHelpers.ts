import type { PrismaClient } from '@code-sync/db';
import { prismaClient } from '../config';
import type { Application } from '../server';
import { startServer } from '../server';

type UnMaybe<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

export const testHelper = () => {
  let _app: Application | undefined;
  let _prismaClient: PrismaClient | undefined;

  const setup = async () => {
    _prismaClient = prismaClient();
    _app = await startServer({ port: 0, prismaClient: _prismaClient });
  };

  const teardown = async () => {
    await _app?.apolloServer?.stop();
    await _prismaClient?.$disconnect();
    _app?.expressServer?.close();
  };

  return {
    setup,
    teardown,
    get app() {
      if (!_app)
        throw new Error(
          '`setup` in the testHelper was not invoked. Invoke the `setup` of `testHelper` in either `beforeEach` or `beforeAll`',
        );

      return _app as UnMaybe<Application>;
    },
    get prismaClient() {
      if (!_prismaClient)
        throw new Error(
          '`setup` in the testHelper was not invoked. Invoke the `setup` of `testHelper` in either `beforeEach` or `beforeAll`',
        );

      return _prismaClient;
    },
  };
};
