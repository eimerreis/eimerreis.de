import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      'server-only': resolve(__dirname, 'test/mocks/server-only.ts'),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules/**', '.next/**', 'tailwind-plus-commit/**'],
  },
});
