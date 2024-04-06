import { GraphQLScalarType } from 'graphql';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value as Date);
    },
    serialize(value) {
      return (value as Date).getTime();
    },
  }),
};

export default resolver;
