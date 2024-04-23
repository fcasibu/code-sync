import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditor } from '@code-sync/web/src/components';

export default {
  title: 'components/Code Editor',
  component: CodeEditor,
} satisfies Meta<typeof CodeEditor>;

type CodeEditorStory = StoryObj<typeof CodeEditor>;

const codeSample = `import { exclude } from '@code-sync/api';
import type { Difficulty } from '@code-sync/db';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Query: {
    codingProblems: (_, __, { codingProblemApi }) => {
      return codingProblemApi.getCodingProblems();
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
`;

export const Default: CodeEditorStory = {
  args: {
    code: codeSample,
  },
};

export const Readonly: CodeEditorStory = {
  args: {
    code: codeSample,
    readOnly: true,
  },
};
