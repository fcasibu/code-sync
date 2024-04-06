import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    rooms: async (_, __, { roomApi }) => {
      return roomApi.getRooms();
    },
    room: async (_, { input }, { roomApi }) => {
      return roomApi.getRoomById(input.id);
    },
  },

  Mutation: {
    createRoom: async (_, { input }, { roomApi }) => {
      return roomApi.createRoom(input);
    },
  },
};

export default resolver;
