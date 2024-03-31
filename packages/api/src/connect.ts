import type { PoolConfig } from 'pg';
import { Pool } from 'pg';

export const createPool = (config: PoolConfig) => new Pool(config);
