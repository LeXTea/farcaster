import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.test.json'], // Explicitly use tsconfig.test.json
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['tests/**/*.test.{ts,tsx}'], // Ensure test files are included
  },
  esbuild: {
    jsx: 'automatic', // Force React JSX runtime
  },
});