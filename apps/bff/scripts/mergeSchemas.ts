import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { glob } from 'glob';
import { print } from 'graphql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schemasDir = '../src/graphql/schemas/';
const files = glob.sync('*.graphql', {
  cwd: join(__dirname, schemasDir),
  ignore: 'schema.graphql',
});

writeFileSync(
  join(__dirname, join(schemasDir, 'schema.graphql')),
  print(
    mergeTypeDefs(
      files.map((file) =>
        readFileSync(join(__dirname, schemasDir, file), 'utf8'),
      ),
    ),
  ),
  'utf-8',
);
