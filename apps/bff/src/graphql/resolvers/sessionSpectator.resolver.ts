import type { Mode } from '@code-sync/db';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Mutation: {
    createSpectator: (_, { input }, { sessionSpectatorApi }) => {
      return sessionSpectatorApi.createSpectator(input);
    },
    updateSpectator: (_, { input }, { sessionSpectatorApi }) => {
      return sessionSpectatorApi.updateSpectator(
        input.spectatorId,
        input.mode as Mode,
      );
    },
  },
};

export default resolver;
