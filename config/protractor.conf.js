const SSReporter = require('protractor-jasmine2-screenshot-reporter');

const screenshotReporter = new SSReporter ({
    dest: 'coverage/protractor',
    pathBuilder: function(currentSpec, suites) {
        var name = currentSpec.fullName;
        return name.replace(/\s+/g, '-').toLowerCase();
    },
    filename: 'index.html',
    reportTitle: 'e2e tests'
});

exports.config = {
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--disable-web-security', '--window-size=1024,768', 'no-sandbox']
        }
    },
    framework: 'jasmine2',
    specs: [
        '../src/**/**.e2e.ts',
        '../src/**/*.e2e.ts'
    ],
    directConnect: true,
    jasmineNodeOpts: {
        showColors: true, // If true, print colors to the terminal.
        showTiming: true,
        defaultTimeoutInterval: 30000, // Default time to wait in ms before a config fails.
        isVerbose: true,
        includeStackTrace: false
    },
    baseUrl: 'http://localhost:8090',
    allScriptsTimeout: 30000,
    // hook into screenshotReporter's beforeLaunch
    beforeLaunch: function() {
        return new Promise(function(resolve){
            screenshotReporter.beforeLaunch(resolve);
        });
    },
    onPrepare: function () {
        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
        // Add screenshot reporter
        jasmine.getEnv().addReporter(screenshotReporter);
        browser.ignoreSynchronization = false;
        browser.driver.manage().window().setSize(414, 736);
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
    },
    // hook into screenshotReporter's afterLaunch
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
