import { cookies } from 'next/headers';
import { graphql } from '@/utils';
import {
  executeGraphQLRequest,
  getRequestBody,
} from '../executeGraphQLRequest';
import type { Pagination } from '../types';

const codingProblemsQuery = graphql(`
  query CodingProblemsQuery($input: CodingProblemsInput) {
    codingProblems(input: $input) {
      id
      title
      description
      createdAt
      difficulty
    }
  }
`);

export const getCodingProblems = async (
  pagination: Pagination = { page: 1, limit: 5 },
) => {
  const { data, errors } = await executeGraphQLRequest<
    typeof codingProblemsQuery
  >(
    {
      headers: {
        cookie: cookies().toString(),
      },
      body: getRequestBody(codingProblemsQuery, {
        input: {
          pagination,
        },
      }),
    },
    'Something went wrong with the getCodingProblems query',
  );

  return { codingProblems: data?.codingProblems, errors };
};
