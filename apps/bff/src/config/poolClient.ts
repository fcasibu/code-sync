import { connectPool, getConfig } from '@code-sync/api';
import { lazy } from '../utils';

export const poolClient = lazy(() => connectPool(getConfig()));
