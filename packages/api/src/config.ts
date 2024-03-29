import { strict as assert } from 'node:assert';
import type { PoolConfig } from 'pg';

export const getConfig = (): PoolConfig => {
  const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD = '',
  } = process.env;

  assert(
    POSTGRES_HOST,
    'POSTGRES_HOST is required to be set in environment variables.',
  );
  assert(
    POSTGRES_PORT,
    'POSTGRES_PORT is required to be set in environment variables.',
  );
  assert(
    POSTGRES_DB,
    'POSTGRES_DB is required to be set in environment variables.',
  );
  assert(
    POSTGRES_USER,
    'POSTGRES_USER is required to be set in environment variables.',
  );

  return {
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
};
