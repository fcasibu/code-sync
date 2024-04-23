import { exclude } from '@code-sync/api';
import type { Difficulty } from '@code-sync/db';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    codingProblems: (_, { input }, { codingProblemApi }) => {
      return codingProblemApi.getCodingProblems(input?.pagination);
    },
    codingProblem: (_, { input }, { codingProblemApi }) => {
      return codingProblemApi.getCodingProblemById(input.id);
    },
  },

  Mutation: {
    createCodingProblem: (_, { input }, { codingProblemApi }) => {
      return codingProblemApi.createCodingProblem({
        ...input,
        difficulty: input.difficulty as Difficulty,
      });
    },
    updateCodingProblem: (_, { input }, { codingProblemApi }) => {
      return codingProblemApi.updateCodingProblem(
        input.problemId,
        exclude(
          {
            ...input,
            difficulty: input.difficulty as Difficulty,
          },
          ['problemId'],
        ),
      );
    },
  },
};

export default resolver;
