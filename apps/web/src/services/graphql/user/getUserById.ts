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
      body: getRequestBody(userQuery, { input: { id } }),
    },
    'Something went wrong with the getUser query',
  );

  return { user: data?.user, errors };
};
