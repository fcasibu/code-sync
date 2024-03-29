import { GraphQLError } from 'graphql';
import { ErrorCodes } from './codes';

export class CorsUnsafeDomainError extends GraphQLError {
  constructor(domain: string) {
    super(`${domain} was not found in the whitelisted domains`, {
      extensions: { code: ErrorCodes.UNSAFE_DOMAIN },
    });
  }
}
