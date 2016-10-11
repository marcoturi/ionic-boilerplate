'use strict';

const path = require('path');
const ts = require('rollup-plugin-typescript');
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const angular = require('rollup-plugin-angular');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');
const istanbul = require('rollup-plugin-istanbul');

module.exports = function karmaConfig(config) {
    var configuration = {
        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '../',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-rollup-plugin'),
            require('karma-phantomjs-launcher'),
            require('karma-mocha-reporter'),
            require('karma-coverage')
        ],
        reporters: [ 'mocha', 'coverage'],
        files: ['config/karma-shim.ts'],
        preprocessors: {'config/karma-shim.ts': ['rollup']},
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
                    '@angular/core/testing': path.resolve(__dirname, '../node_modules/@angular/core/testing/index.js'),
                    '@angular/platform-browser-dynamic/testing': path.resolve(__dirname, '../node_modules/@angular/platform-browser-dynamic/testing/index.js'),
                    '@angular/compiler/testing': path.resolve(__dirname, '../node_modules/@angular/compiler/testing/index.js'),
                    '@angular/platform-browser/testing': path.resolve(__dirname, '../node_modules/@angular/platform-browser/testing/index.js')
                }),
                commonjs(),
                nodeResolve({ jsnext: true, main: true, browser: true }),
                buble(),
                istanbul({
                    include: ['**/*.ts'],
                    ignore: ['**/node_modules/**'],
                    exclude: ['**/*.spec.ts', '**/config/**']
                })
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        coverageReporter: {
            dir : 'coverage/',
            subdir: 'istanbul',
            reporters: [{
                type: 'text'
            }, {
                type: 'html'
            }]
        }
    };

    config.set(configuration);
};

