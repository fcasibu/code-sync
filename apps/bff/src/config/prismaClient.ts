import { createPool, getConfig } from '@code-sync/api';
import { getPrismaClient } from '@code-sync/db';
import { lazy } from '../utils';

export const prismaClient = lazy(() =>
  getPrismaClient(createPool(getConfig())),
);
