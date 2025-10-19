import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      reporter: ['text', 'html'], // Generates text and HTML coverage reports
      reportsDirectory: './coverage', // Directory for coverage reports
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});