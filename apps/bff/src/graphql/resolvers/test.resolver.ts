import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    test: () => {
      return {
        helloWorld: 'Hello, World!',
      };
    },
  },
};

export default resolver;
