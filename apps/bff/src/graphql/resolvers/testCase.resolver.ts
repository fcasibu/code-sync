import { exclude } from '@code-sync/api';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Mutation: {
    createTestCase: (_, { input }, { testCaseApi }) => {
      return testCaseApi.createTestCase(input);
    },
    updateTestCase: (_, { input }, { testCaseApi }) => {
      return testCaseApi.updateTestcase(
        input.testCaseId,
        exclude(input, ['testCaseId']),
      );
    },
  },
};

export default resolver;
