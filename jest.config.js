module.exports = {
  transform: {
    '\\.(js|jsx)$': 'babel-jest',
    '\\.(json)$': '<rootDir>/__tests__/__utils__/fileTransformer.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/__tests__/__utils__/setup.js',
};
