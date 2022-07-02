const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/impl/*.ts'
  ],
  coverageDirectory: 'coverage/e2e',
  coverageProvider: 'v8',
  coverageReporters: [
    'text-summary',
    'lcov',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  testMatch: [
	  '<rootDir>/src/modules/**/tests/e2e/*.spec.ts'
	],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
