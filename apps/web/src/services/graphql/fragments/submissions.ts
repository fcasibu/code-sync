import type { ResultOf } from 'gql.tada';
import { graphql } from '@/utils';

export const submissionFragment = graphql(`
  fragment Submission on Submission @_unmask {
    id
    status
    code
    language
    userId
    problemId
    createdAt
    updatedAt
  }
`);

export const completeSubmissionFragment = graphql(`
  fragment CompleteSubmission on CompleteSubmission @_unmask {
    id
    status
    code
    language
    createdAt
    updatedAt
    # TODO: user/problem field fragments
  }
`);

export type Submission = ResultOf<typeof submissionFragment>;
export type CompleteSubmission = ResultOf<typeof completeSubmissionFragment>;
