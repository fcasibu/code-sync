import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Mutation: {
    createSession: (_, { input }, { codingProblemSessionApi }) => {
      return codingProblemSessionApi.createSession(input);
    },
    updateSession: (_, { input }, { codingProblemSessionApi }) => {
      return codingProblemSessionApi.updateSession(
        input.sessionId,
        input.sharedCode,
      );
    },
  },
};

export default resolver;
