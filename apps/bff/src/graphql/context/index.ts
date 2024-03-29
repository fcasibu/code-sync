import type { UserAPI } from '@code-sync/api';
import type { User } from '../types';

export interface Context {
  userApi: UserAPI<User>;
}
