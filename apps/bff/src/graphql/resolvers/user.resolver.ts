import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    users: async (_, __, { userApi }) => {
      return userApi.getUsers();
    },
    user: async (_, { input }, { userApi, isAuthorized }) => {
      console.log(isAuthorized);
      return userApi.getUserById(input.id);
    },
  },

  Mutation: {
    createUser: async (_, { input }, { userApi }) => {
      return userApi.createUser(input);
    },
  },
};

export default resolver;
