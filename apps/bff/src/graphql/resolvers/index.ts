import { mergeResolvers } from '@graphql-tools/merge';
import type { Resolvers } from '../types';
import dateResolver from './date.resolver';
import roomResolver from './room.resolver';
import testResolver from './test.resolver';
import userResolver from './user.resolver';

export const resolvers: Resolvers = mergeResolvers([
  testResolver,
  userResolver,
  roomResolver,
  dateResolver,
]);
