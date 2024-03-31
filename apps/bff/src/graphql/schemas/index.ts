import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});
