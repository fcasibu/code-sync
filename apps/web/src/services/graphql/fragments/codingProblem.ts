import type { ResultOf } from 'gql.tada';
import { graphql } from '@/utils';
import { submissionFragment } from './submissions';

export const codingProblemFragment = graphql(`
  fragment CodingProblem on CodingProblem @_unmask {
    id
    title
    description
    authorId
    difficulty
    createdAt
    updatedAt
  }
`);

export const completeCodingProblemFragment = graphql(
  `
    fragment CompleteCodingProblem on CompleteCodingProblem @_unmask {
      id
      title
      description
      submissions {
        ...Submission
      }
      difficulty
      createdAt
      updatedAt
      # TODO: author fragment
    }
  `,
  [submissionFragment],
);

export type CodingProblem = ResultOf<typeof codingProblemFragment>;
export type CompleteCodingProblem = ResultOf<
  typeof completeCodingProblemFragment
>;
