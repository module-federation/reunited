
global.testRuns = 0;

// Used to run Garbage Collection after each describe block
// This will reduce our memory used in CI
// We limit it to run after every 10 decribe blocks to
// maintain the speed of testing all test files
// https://dev.to/pustovalov_p/reducing-jest-memory-usage-1ina
afterEach(() => {
  global.testRuns++;

  if (global.testRuns < 10) return null;
  if (global.gc) global.gc();

  global.testRuns = 0;
});
