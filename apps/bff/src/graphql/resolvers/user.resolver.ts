import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    user: (_, { input }, { userApi }) => {
      return userApi.getUserById(input.id);
    },
    userByProviderAndProviderId: (_, { provider, providerId }, { userApi }) => {
      return userApi.getUserByProviderAndProviderId(provider, providerId);
    },
  },

  Mutation: {
    createUser: (_, { input }, { userApi }) => {
      return userApi.createUser(input);
    },
  },
};

export default resolver;
