import { mergeResolvers } from '@graphql-tools/merge';
import type { Resolvers } from '../types';
import codingProblemResolver from './codingProblem.resolver';
import codingProblemSessionResolver from './codingProblemSession.resolver';
import dateResolver from './date.resolver';
import sessionSpectatorResolver from './sessionSpectator.resolver';
import submissionResolver from './submission.resolver';
import testCaseResolver from './testCase.resolver';
import userResolver from './user.resolver';

export const resolvers: Resolvers = mergeResolvers([
  dateResolver,
  codingProblemResolver,
  userResolver,
  testCaseResolver,
  submissionResolver,
  sessionSpectatorResolver,
  codingProblemSessionResolver,
]);
