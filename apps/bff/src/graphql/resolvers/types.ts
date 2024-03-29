import type { Resolvers } from '../types';

type UnMaybe<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

export interface RequiredResolvers<T extends keyof Resolvers> {
  Query: {
    [key in T]: UnMaybe<Resolvers>[T];
  };
}
