module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageReporters: [
    'json',
    [
      'lcov',
      {
        projectRoot: '../../../../../',
      },
    ],
    'text',
    'clover',
    'json-summary',
  ],
};
