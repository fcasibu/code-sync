import type { VariablesOf } from 'gql.tada';

export interface RequestBody<T> {
  query: string;
  variables: VariablesOf<T>;
}
