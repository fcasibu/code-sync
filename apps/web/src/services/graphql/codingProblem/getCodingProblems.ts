import { cookies } from 'next/headers';
import { graphql } from '@/utils';
import {
  executeGraphQLRequest,
  getRequestBody,
} from '../executeGraphQLRequest';

const codingProblemsQuery = graphql(`
  query CodingProblemsQuery {
    codingProblems {
      id
      title
      description
      createdAt
      difficulty
    }
  }
`);

// TODO: filtering
export const getCodingProblems = async () => {
  const { data, errors } = await executeGraphQLRequest<
    typeof codingProblemsQuery
  >(
    {
      headers: {
        cookie: cookies().toString(),
      },
      body: getRequestBody(codingProblemsQuery, {}),
    },
    'Something went wrong with the getCodingProblems query',
  );

  return { codingProblems: data?.codingProblems, errors };
};
