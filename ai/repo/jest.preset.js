const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '**/__tests__/**/*.(ts|js)',
    '**/*.(test|spec).(ts|js)'
  ],
  collectCoverageFrom: [
    'packages/**/*.{ts,js}',
    'apps/**/*.{ts,js}',
    'libs/**/*.{ts,js}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: pathsToModuleNameMapper({
    '@infinityx/*': ['packages/*/src']
  }, { prefix: '<rootDir>/' })
};