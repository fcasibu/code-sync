import type { Resolvers } from '../types';

type UnMaybe<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
