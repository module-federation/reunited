process.env.TZ = 'UTC';

module.exports = {
  moduleNameMapper: {
    // moduleNameMapper: {
    //   '^react-dom$': compat,
    //   '^react$': compat,
    // },
    '\\.(css|scss|png|ico)$': 'identity-obj-proxy',
    '\\.(svg|jpg|png)': '<rootDir>/jest /file-mock.js',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
  ],
  setupFiles: [
    './jest/jestSetup.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // Used to run Garbage Collection after each describe block
  // This will reduce our memory used in CI
  // https://dev.to/pustovalov_p/reducing-jest-memory-usage-1ina
  setupFilesAfterEnv: [
    './jest/force-gc.js',
  ],
};
