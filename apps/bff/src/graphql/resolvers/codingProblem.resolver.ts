import { strict as assert } from 'node:assert';
import { exclude } from '@code-sync/api';
import type { Difficulty } from '@code-sync/db';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    codingProblems: (_, { input }, { codingProblemApi }) => {
      assert(
        !input || input.pagination.page >= 1,
        'Page must be more than or equal to 1',
      );
      assert(
        !input || input.pagination.limit >= 1,
        'Limit must be more than or equal to 1',
      );

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
