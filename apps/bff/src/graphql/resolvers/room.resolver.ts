import logger from '@code-sync/logger';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    room: (_, { input }, { roomApi }) => {
      return roomApi.getRoomById(input.id);
    },
  },

  Mutation: {
    createRoom: (_, { input }, { roomApi }) => {
      return roomApi.createRoom(input);
    },
    createPrivateRoom: (_, { input }, { roomApi }) => {
      return roomApi.createPrivateRoom(input);
    },
    deleteRoom: async (_, { roomId }, { roomApi }) => {
      try {
        const deletedRoom = await roomApi.deleteRoom(roomId);

        return Boolean(deletedRoom);
      } catch (e) {
        logger.error(e, 'Something wetn wrong with deleting a room.');
        return false;
      }
    },
  },
};

export default resolver;
