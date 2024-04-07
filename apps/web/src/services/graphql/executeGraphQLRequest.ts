import type { ResultOf } from 'gql.tada';
import type { ASTNode, GraphQLError } from 'graphql';
import { print } from 'graphql';
import { logger } from '@code-sync/logger';
import { REVALIDATE_TIME } from '@/constants/cache';
import { env } from '@/env';
import { isServer } from '@/utils';

interface Result<T> {
  data: ResultOf<T> | null;
  errors: GraphQLError[] | null;
}

export const executeGraphQLRequest = async <T>(
  init: RequestInit,
  errorLogMessage: string,
): Promise<Result<T>> => {
  try {
    const response = await fetch(
      isServer ? `${env.APP_URL}/api/graphql` : '/api/graphql',
      {
        ...init,
        method: 'POST',
        headers: {
          ...init.headers,
          revalidate: `${init.next?.revalidate ?? REVALIDATE_TIME}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: REVALIDATE_TIME,
          ...init.next,
        },
      },
    );

    const { data, errors } = (await response.json()) as {
      data: ResultOf<T>;
      errors?: GraphQLError[];
    };

    if (errors) throw errors;

    return { data, errors: null };
  } catch (e) {
    logger.error(e, errorLogMessage);
    return { data: null, errors: e as GraphQLError[] };
  }
};

export const getRequestBody = (query: ASTNode, variables: unknown) =>
  JSON.stringify({
    query: print(query),
    variables,
  });
