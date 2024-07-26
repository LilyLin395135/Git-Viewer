module.exports = {
    preset: 'jest-playwright-preset',
    testEnvironmentOptions: {
        browsers: ['chromium'],
    },
    globalSetup: './setup.js',
    globalTeardown: './teardown.js',
};
