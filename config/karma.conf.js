'use strict';

const path = require('path');
const tsConfig = require("../tsconfig.json");

module.exports = function karmaConfig(config) {
    var configuration = {
        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '../',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-rollup-plugin'),
            require('karma-phantomjs-launcher'),
            require('karma-mocha-reporter')
            // require('karma-coverage'),
            // require('karma-remap-coverage')
        ],
        reporters: ['mocha'], //'coverage', 'remap-coverage'],
        files: ['config/karma-shim.ts'],
        preprocessors: {'config/karma-shim.ts': ['rollup']}, //'coverage']},
        rollupPreprocessor: {
            // rollup settings. See Rollup documentation
            plugins: [
                require('rollup-plugin-angular')({
                    exclude: 'node_modules/**'
                }),
                require('rollup-plugin-typescript')(Object.assign({}, tsConfig.compilerOptions, {
                    typescript: require('../node_modules/typescript'),
                    // sourceMap: true
                })),
                require('rollup-plugin-commonjs')({
                    sourceMap: false
                }),
                // require('rollup-plugin-istanbul')({
                //     exclude: ['**/node_modules/**', '**/*.spec.ts', '**/config/**']
                // }),
                require('rollup-plugin-alias')({
                    '@angular/core/testing': path.resolve(__dirname, '../node_modules/@angular/core/testing/index.js'),
                    '@angular/platform-browser-dynamic/testing': path.resolve(__dirname, '../node_modules/@angular/platform-browser-dynamic/testing/index.js'),
                    '@angular/compiler/testing': path.resolve(__dirname, '../node_modules/@angular/compiler/testing/index.js'),
                    '@angular/platform-browser/testing': path.resolve(__dirname, '../node_modules/@angular/platform-browser/testing/index.js')
                }),

                require('rollup-plugin-node-resolve')({
                    jsnext: true,
                    main: true,
                    browser: true}),
                require('rollup-plugin-buble')()
            ],
            context: 'this',
            // will help to prevent conflicts between different tests entries
            format: 'iife',
            // sourceMap: "inline"
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
        // coverageReporter: {
        //     type: 'in-memory'
        // },
        // remapCoverageReporter: {
        //     'text-summary': null, // to show summary in console
        //     html: './coverage/istanbul'
        // },
        // coverageReporter: {
        //     dir : 'coverage/',
        //     subdir: 'istanbul',
        //     reporters: [{
        //         type: 'text'
        //     }, {
        //         type: 'html'
        //     }]
        // }
    };

    config.set(configuration);
};

