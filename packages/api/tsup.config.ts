import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  clean: true,
  entry: ['./index.ts'],
  minify: true,
  sourcemap: false,
  target: 'es2022',
  dts: true,
  treeshake: true,
});
