import type { Language } from '@code-sync/db';
import type { Resolvers } from '../types';

const resolver: Resolvers = {
  Mutation: {
    createDocument: (_, { input }, { documentApi }) => {
      const lang = input.language as Language;
      return documentApi.createDocument({ ...input, language: lang });
    },
    saveDocument: (_, { input }, { documentApi }) => {
      return documentApi.saveDocument(input.documentId, input.content);
    },
  },
};

export default resolver;
