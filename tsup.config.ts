import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/server/index.ts'],
  outDir: 'dist/server',
  format: ['cjs'],
  platform: 'node',
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.plugins = [
      {
        name: 'root-alias',
        setup(build) {
          build.onResolve({ filter: /^@\// }, args => ({
            path: path.resolve(__dirname, 'src', args.path.replace(/^@\//, ''))
          }));
        }
      }
    ];
  }
});