import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  format: 'esm',
  minify: true,
  sourcemap: false,
  target: 'es2022',
  treeshake: true,
});
