module.exports = (config) => {

    var testWebpackConfig = require('./webpack.test.js')({});

    const configuration = {

        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            {pattern: './config/karma-shim.js', watched: false},
            { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }],
        preprocessors: { './config/karma-shim.js': ['coverage', 'webpack', 'sourcemap'] },
        webpack: testWebpackConfig,
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e.
                chunks: false
            }
        },
        reporters: [ 'mocha'],
        port: 9876,
        colors: true,
        client: {
            captureConsole: false
        },
        /*
         * By default all assets are served at http://localhost:[PORT]/base/
         */
        proxies: {
            "/assets/": "/base/src/assets/"
        },
        /*
         * level of logging
         * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         */
        logLevel: config.LOG_WARN,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        /*
         * start these browsers
         * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         */
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--disable-translate',
                    '--disable-extensions',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222',
                ],
            }
        },
        browsers: [
            'ChromeHeadless'
        ],
        singleRun: true
    };

    if(process.env.NO_COVERAGE !== 'true') {
        configuration.reporters.push( 'coverage', 'remap-coverage');
        configuration.coverageReporter = {
            type: 'in-memory'
        };

        configuration.remapCoverageReporter = {
            'text-summary': null,
            html: './coverage/istanbul'
        };
    }


    config.set(configuration);
};
