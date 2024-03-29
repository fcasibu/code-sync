import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const files = glob.sync('*.graphql', {
  cwd: __dirname,
});

export const typeDefs = mergeTypeDefs(
  files.map((file) => readFileSync(join(__dirname, file), 'utf8')),
);
