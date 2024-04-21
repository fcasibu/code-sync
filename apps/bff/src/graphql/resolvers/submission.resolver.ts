import type { Language } from '@code-sync/db';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Mutation: {
    createSubmission: (_, { input }, { submissionApi }) => {
      return submissionApi.submit({
        ...input,
        language: input.language as Language,
      });
    },
  },
};

export default resolver;
