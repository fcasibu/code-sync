import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    user: (_, { input }, { userApi }) => {
      return userApi.getUserById(input.id);
    },
  },

  Mutation: {
    createUser: (_, { input }, { userApi }) => {
      return userApi.createUser(input);
    },
  },
};

export default resolver;
