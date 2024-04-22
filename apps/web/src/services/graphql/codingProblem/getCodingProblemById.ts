import { cache } from 'react';
import { cookies } from 'next/headers';
import { graphql } from '@/utils';
import {
  executeGraphQLRequest,
  getRequestBody,
} from '../executeGraphQLRequest';
import { completeCodingProblemFragment } from '../fragments';

const codingProblemQuery = graphql(
  `
    query CodingProblemQuery($input: CodingProblemByIdInput!) {
      codingProblem(input: $input) {
        ...CompleteCodingProblem
      }
    }
  `,
  [completeCodingProblemFragment],
);

export const getCodingProblemById = cache(async (id: string) => {
  const { data, errors } = await executeGraphQLRequest<
    typeof codingProblemQuery
  >(
    {
      headers: {
        cookie: cookies().toString(),
      },
      body: getRequestBody(codingProblemQuery, { input: { id } }),
    },
    'Something went wrong with the getCodingProblemById query',
  );

  return { codingProblem: data?.codingProblem, errors };
});
