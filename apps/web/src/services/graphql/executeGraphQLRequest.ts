/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ResultOf, TadaDocumentNode, VariablesOf } from 'gql.tada';
import type { GraphQLError } from 'graphql';
import { print } from 'graphql';
import { logger } from '@code-sync/logger';
import {
  INTERNAL_HEADER_API_KEY,
  INTERNAL_HEADER_REVALIDATE_KEY,
} from '@/constants';
import { REVALIDATE_TIME } from '@/constants/cache';
import { env } from '@/env';
import { isServer } from '@/utils';

interface Result<T extends TadaDocumentNode<any, any>> {
  data: ResultOf<T> | null;
  errors: GraphQLError[] | null;
}

export const executeGraphQLRequest = async <
  T extends TadaDocumentNode<any, any>,
>(
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
          'Content-Type': 'application/json',
          [INTERNAL_HEADER_REVALIDATE_KEY]: `${init.next?.revalidate ?? REVALIDATE_TIME}`,
          [INTERNAL_HEADER_API_KEY]: env.INTERNAL_HEADER_API_KEY_VALUE,
        },
        next: {
          revalidate: REVALIDATE_TIME,
          ...init.next,
        },
      },
    );

    const { data, errors } = (await response.json()) as Result<T>;

    if (errors) throw errors;

    return { data, errors: null };
  } catch (e) {
    logger.error(e, errorLogMessage);
    return { data: null, errors: e as GraphQLError[] };
  }
};

export const getRequestBody = <T extends TadaDocumentNode<any, any>>(
  query: T,
  variables: VariablesOf<T>,
) =>
  JSON.stringify({
    query: print(query),
    variables,
  });
