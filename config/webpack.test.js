/**
 * This config file was inspired by https://github.com/AngularClass/angular2-webpack-starter/
 * all credits go to them!
 */

const helpers = require('./helpers');
const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const coverageEnabled = process.env.NO_COVERAGE !== 'true';


/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (options) => {

    /**
     * Instruments JS files with Istanbul for subsequent code coverage reporting.
     * Instrument only testing sources.
     *
     * See: https://github.com/deepsweet/istanbul-instrumenter-loader
     *
     * @hack: Disabling coverage if NO_COVERAGE env var is set to 'true'.
     * This is useful for karma debug.
     *
     * See: https://github.com/AngularClass/angular2-webpack-starter/issues/361?_pjax=%23js-repo-pjax-container
     * See: https://github.com/gotwarlost/istanbul/issues/212
     *
     */
    let postLoaders = {};
    if (coverageEnabled) {
        postLoaders = {
            enforce: 'post',
            test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
            include: helpers.root('src'),
            exclude: [
                /\.(e2e|spec)\.ts$/,
                /node_modules/
            ]
        };

    }

    return {
        /**
         * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
         *
         * Do not change, leave as is or it wont work.
         * See: https://github.com/webpack/karma-webpack#source-maps
         */
        devtool: 'inline-source-map',
        /**
         * Options affecting the resolving of modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve: {
            /**
             * An array of extensions that should be used to resolve modules.
             *
             * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
             */
            extensions: ['.ts', '.js', '.json'],
            /**
             * Make sure root is src
             */
            modules: [ path.resolve(__dirname, 'src'), 'node_modules' ]

        },
        /**
         * Options affecting the normal modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module: {
            rules: [
                /**
                 * Source map loader support for *.js files
                 * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
                 *
                 * See: https://github.com/webpack/source-map-loader
                 */
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    exclude: [
                        // these packages have problems with their sourcemaps
                        helpers.root('node_modules/rxjs'),
                        helpers.root('node_modules/@angular'),
                        helpers.root('node_modules/ionic-angular')
                    ]
                },
                /**
                 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                 *
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 */
                {
                    test: /\.ts$/,

                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            // options: {
                            //     configFileName: 'tsconfig.test.json'
                            // },
                            query: {
                                /**
                                 * Use inline sourcemaps for "karma-remap-coverage" reporter
                                 */
                                sourceMap: !coverageEnabled,
                                inlineSourceMap: coverageEnabled,
                                module: 'commonjs',
                                noEmitHelpers: true,
                                compilerOptions: {

                                    /**
                                     * Remove TypeScript helpers to be injected
                                     * below by DefinePlugin
                                     */
                                    removeComments: true

                                }
                            },
                        },
                        // {
                        //     loader: 'ngc-webpack',
                        //     options: {
                        //         tsConfigPath: "tsconfig.test.json",
                        //     }
                        // },
                        {
                            loader: 'angular2-template-loader'
                        }
                    ],

                    exclude: [/\.e2e\.ts$/]
                },
                /**
                 * Raw loader support for *.html
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [helpers.root('src/index.html')]
                },

                postLoaders
            ]
        },
        /**
         * Add additional plugins to the compiler.
         *
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins: [
            /**
             * Plugin: DefinePlugin
             * Description: Define free variables.
             * Useful for having development builds with debug logging or adding global constants.
             *
             * Environment helpers
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
             */
            // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
            new DefinePlugin({
                'ENV': JSON.stringify(ENV),
                'process.env': {
                    'ENV': JSON.stringify(ENV),
                    'NODE_ENV': JSON.stringify(ENV)
                }
            }),
            /**
             * Plugin: ContextReplacementPlugin
             * Description: Provides context to Angular's use of System.import
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
             * See: https://github.com/angular/angular/issues/11580
             */
            new ContextReplacementPlugin(
                /(ionic-angular)|(@angular(\\|\/)core(\\|\/)esm5)/,
                path.resolve('./src'),
                {}
            ),
            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new LoaderOptionsPlugin({
                debug: false,
                options: {
                    /**
                     * legacy options go here
                     */
                }
            }),
        ],
        /**
         * Disable performance hints
         *
         * See: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
         */
        performance: {
            hints: false
        },
        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            process: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
};
