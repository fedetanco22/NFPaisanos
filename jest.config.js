const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: '.',
  moduleDirectories: ['node_modules'],
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
