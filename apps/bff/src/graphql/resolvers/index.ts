import { mergeResolvers } from '@graphql-tools/merge';
import type { Resolvers } from '../types';
import testResolver from './test.resolver';
import userResolver from './user.resolver';

export const resolvers: Resolvers = mergeResolvers([
  testResolver,
  userResolver,
]);
