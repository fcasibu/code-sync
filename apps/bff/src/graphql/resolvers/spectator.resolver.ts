import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Mutation: {
    joinRoom: (_, { input }, { spectatorApi }) => {
      return spectatorApi.joinRoom(input);
    },
    switchSpectatorToCollaborator: (_, { input }, { spectatorApi }) => {
      return spectatorApi.switchSpectatorToCollaborator(input.spectatorId);
    },
    switchCollaboratorToSpectator: (_, { input }, { spectatorApi }) => {
      return spectatorApi.switchCollaboratorToSpectator(input.spectatorId);
    },
  },
};

export default resolver;
