module.exports = function(config) {
    var testWebpackConfig = require('./webpack.test.js')({env: 'test'});

    var configuration = {

        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '',
        frameworks: ['jasmine'],
        files: [ { pattern: './config/karma-shim.js', watched: false } ],
        preprocessors: { './config/karma-shim.js': ['coverage', 'webpack', 'sourcemap'] },
        webpack: testWebpackConfig,
        coverageReporter: {
            type: 'in-memory'
        },
        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },
        webpackMiddleware: { stats: 'errors-only'},
        reporters: [ 'mocha', 'coverage', 'remap-coverage' ],
        port: 9876,
        colors: true,

        /*
         * level of logging
         * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         */
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        /*
         * start these browsers
         * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         */
        browsers: [
            'Chrome'
        ],
        singleRun: true
    };


    config.set(configuration);
};
