import { config } from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import baseConfig from '@code-sync/vitest-config';

export default defineConfig({
  ...baseConfig,
  plugins: [tsconfigPaths()],
  test: {
    env: {
      ...config({ path: './.env.test' }).parsed,
    },
  },
});
