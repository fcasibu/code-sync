import { mergeResolvers } from '@graphql-tools/merge';
import type { Resolvers } from '../types';
import dateResolver from './date.resolver';
import documentResolver from './document.resolver';
import roomResolver from './room.resolver';
import spectatorResolver from './spectator.resolver';
import testResolver from './test.resolver';
import userResolver from './user.resolver';

export const resolvers: Resolvers = mergeResolvers([
  dateResolver,
  documentResolver,
  roomResolver,
  spectatorResolver,
  testResolver,
  userResolver,
]);
