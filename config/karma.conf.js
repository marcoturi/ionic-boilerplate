'use strict';

const path = require('path');
const ts = require('rollup-plugin-typescript');
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const angular = require('rollup-plugin-angular');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');

module.exports = function karmaConfig(config) {
    var configuration = {
        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '../',
        frameworks: ['jasmine'],
        reporters: [
            // Reference: https://github.com/mlex/karma-spec-reporter
            // Set reporter to print detailed results to console
            'spec',
            // Reference: https://github.com/karma-runner/karma-coverage
            // Output code coverage files
            'coverage'
        ],
        // list of files / patterns to load in the browser we are building
        // the config environment in ./karma-shim.js
        files: [
            'src/**/*.spec.ts'
        ],
        // list of files to exclude
        exclude: [
            'node_modules/angular2/**/*_spec.js',
            'node_modules/ionic-angular/**/*spec*'
        ],
        preprocessors: {
            'src/**/*.spec.ts': ['rollup']
        },
        rollupPreprocessor: {
            context: 'this',
            plugins: [
                angular({
                    exclude: 'node_modules/**'
                }),
                ts({
                    typescript: require('../node_modules/typescript')
                }),
                alias({
                    rxjs: path.resolve(__dirname, '../node_modules/rxjs-es'),
                    '@angular/core/testing': path.resolve(__dirname, '../node_modules/@angular/core/testing/index'),
                    '@angular/platform-browser-dynamic/testing': path.resolve(__dirname, '../node_modules/@angular/platform-browser-dynamic/testing/index'),
                    '@angular/compiler/testing': path.resolve(__dirname, '../node_modules/@angular/compiler/testing/index'),
                    '@angular/platform-browser/testing': path.resolve(__dirname, '../node_modules/@angular/platform-browser/testing/index')
                }),
                commonjs(),
                nodeResolve({ jsnext: true, main: true, browser: true }),
                buble()
            ]
        },
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome'
        ],
        browserNoActivityTimeout: 30000,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // Configure code coverage reporter
        coverageReporter: {
            dir: 'coverage/',
            type: 'html'
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        colors: true,
         // Continuous Integration mode if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    };

    // if(process.env.GITLAB_CI){
    //     //configuration.browsers = ['Chrome_travis_ci'];
    // }

    config.set(configuration);
};

