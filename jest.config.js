const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/tailwind-plus-commit/'],
  modulePathIgnorePatterns: ['<rootDir>/tailwind-plus-commit/']
};

module.exports = createJestConfig(customJestConfig);
