import type { VariablesOf } from 'gql.tada';
import { cookies } from 'next/headers';
import { graphql } from '@/utils';
import {
  executeGraphQLRequest,
  getRequestBody,
} from '../executeGraphQLRequest';

const createUserMutation = graphql(`
  mutation UserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`);

export const createUser = async (
  variables: VariablesOf<typeof createUserMutation>,
) => {
  const { data, errors } = await executeGraphQLRequest<
    typeof createUserMutation
  >(
    {
      headers: {
        cookie: cookies().toString(),
      },
      body: getRequestBody(createUserMutation, variables),
      next: { revalidate: 0 },
    },
    'Something went wrong with the createUser mutation',
  );

  return { user: data?.createUser, errors };
};
