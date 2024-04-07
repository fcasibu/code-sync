import { graphql } from '@/utils';
import {
  executeGraphQLRequest,
  getRequestBody,
} from '../executeGraphQLRequest';

const userByProviderAndProviderIdQuery = graphql(`
  query UserQuery($provider: String!, $providerId: String!) {
    userByProviderAndProviderId(provider: $provider, providerId: $providerId) {
      id
    }
  }
`);

export const getUserByProviderAndProviderId = async (
  provider: string,
  providerId: string,
) => {
  const { data, errors } = await executeGraphQLRequest<
    typeof userByProviderAndProviderIdQuery
  >(
    {
      body: getRequestBody(userByProviderAndProviderIdQuery, {
        provider,
        providerId,
      }),
    },
    'Something went wrong with the getUserByProviderAndProviderId query',
  );

  return { user: data?.userByProviderAndProviderId, errors };
};
