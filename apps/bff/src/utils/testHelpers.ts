import type { PoolClient } from '@code-sync/api';
import { poolClient } from '../config';
import type { Application } from '../server';
import { startServer } from '../server';

type UnMaybe<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

export const testHelper = () => {
  let _app: Application | undefined;
  let _db: PoolClient | undefined;

  const setup = async () => {
    _db = await poolClient();
    _app = await startServer({ port: 0, poolClient: _db });
  };

  const teardown = async () => {
    await _app?.apolloServer?.stop();
    _db?.release();
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
    get db() {
      if (!_db)
        throw new Error(
          '`setup` in the testHelper was not invoked. Invoke the `setup` of `testHelper` in either `beforeEach` or `beforeAll`',
        );

      return _db;
    },
  };
};
