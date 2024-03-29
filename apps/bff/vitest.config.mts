import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';
import baseConfig from '@code-sync/vitest-config';

export default defineConfig({
  ...baseConfig,
  test: {
    env: {
      ...config({ path: './.env.test' }).parsed,
    },
  },
});
