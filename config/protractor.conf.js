const helpers = require('./helpers');
const SSReporter = require('protractor-jasmine2-screenshot-reporter');

const screenshotReporter = new SSReporter ({
    dest: 'coverage/protractor',
    cleanDestination: true,
    pathBuilder: function(currentSpec, suites, browserCapabilities) {
        return browserCapabilities.get('browserName') + '/' + currentSpec.fullName;
    },
    filename: 'e2e-report.html',
    reportTitle: 'E2E Tests Report'
});

exports.config = {
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [ '--headless', '--disable-gpu', '--window-size=414,736',]
        }
    },
    framework: 'jasmine2',
    specs: [
        helpers.root('src/**/**.e2e.ts'),
        helpers.root('src/**/*.e2e.ts')
    ],
    directConnect: true,
    jasmineNodeOpts: {
        showColors: true, // If true, print colors to the terminal.
        showTiming: true,
        defaultTimeoutInterval: 30000, // Default time to wait in ms before a config fails.
        isVerbose: false,
        includeStackTrace: false
    },
    baseUrl: 'http://localhost:8090',
    allScriptsTimeout: 30000,
    onPrepare: function () {
        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
        // Add screenshot reporter
        jasmine.getEnv().addReporter(screenshotReporter);
        browser.ignoreSynchronization = false;
        // browser.driver.manage().window().setSize(414, 736);
    },
    beforeLaunch: function() {
        require('ts-node').register({
            project: '.',
            compilerOptions: {
                module: 'commonjs'
            },
            disableWarnings: true,
            fast: true
        });

        return new Promise(function(resolve){
            screenshotReporter.beforeLaunch(resolve);
        });
    },
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true
};
