import { cookies } from 'next/headers';
import { graphql } from '@/utils';
import {
  executeGraphQLRequest,
  getRequestBody,
} from '../executeGraphQLRequest';

const userQuery = graphql(`
  query UserQuery($input: UserByIdInput!) {
    user(input: $input) {
      id
      displayName
      email
      profilePicture
      rooms {
        id
        name
      }
    }
  }
`);

export const getUserById = async (id: string) => {
  const { data, errors } = await executeGraphQLRequest<typeof userQuery>(
    {
      headers: {
        cookie: cookies().toString(),
      },
      body: getRequestBody(userQuery, { input: { id } }),
      next: {
        revalidate: 0,
      },
    },
    'Something went wrong with the getUser query',
  );

  return { user: data?.user, errors };
};
