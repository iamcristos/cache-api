module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/index.js',
    '<rootDir>/src/config',
  ],
};
