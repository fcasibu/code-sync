import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    users: async (_, __, { userApi }) => {
      return userApi.getUsers();
    },
    user: async (_, { input }, { userApi }) => {
      return userApi.getUserById(input.id);
    },
  },
};

export default resolver;
