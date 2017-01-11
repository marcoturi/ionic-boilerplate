/**
 * This config file was inspired by https://github.com/AngularClass/angular2-webpack-starter/
 * all credits go to them!
 */

const helpers = require('./helpers');
const path = require('path');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
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
            extensions: ['.ts', '.js'],

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
                 * Tslint loader support for *.ts files
                 *
                 * See: https://github.com/wbuchwalter/tslint-loader
                 */
                {
                    enforce: 'pre',
                    test: /\.ts$/,
                    loader: 'tslint-loader',
                    exclude: [helpers.root('node_modules')]
                },

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
                        helpers.root('node_modules/ionic-angular'),
                        helpers.root('node_modules/ionic-native')
                    ]
                },

                /**
                 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                 *
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 */
                {
                    test: /\.ts$/,

                    loaders: [
                        `awesome-typescript-loader?sourceMap=${!coverageEnabled},inlineSourceMap=${coverageEnabled},module=commonjs,noEmitHelpers=true,compilerOptions{}=removeComments:true`,
                        'angular2-template-loader'
                    ],
                    // query: {
                    //     // use inline sourcemaps for "karma-remap-coverage" reporter
                    //     sourceMap: !coverageEnabled,
                    //     inlineSourceMap: coverageEnabled,
                    //     module: 'commonjs',
                    //     noEmitHelpers: true,
                    //     compilerOptions: {
                    //         removeComments: true
                    //     }
                    // },
                    exclude: [/\.e2e\.ts$/]
                },

                /**
                 * Json loader support for *.json files.
                 *
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                    exclude: [helpers.root('src/index.html')]
                },

                /**
                 * Raw loader support for *.css files
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.css$/,
                    loaders: ['to-string-loader', 'css-loader'],
                    exclude: [helpers.root('src/index.html')]
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
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root('src') // location of your src
            ),

            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new LoaderOptionsPlugin({
                debug: true,
                options: {

                    /**
                     * Static analysis linter for TypeScript advanced options configuration
                     * Description: An extensible linter for the TypeScript language.
                     *
                     * See: https://github.com/wbuchwalter/tslint-loader
                     */
                    tslint: {
                        emitErrors: false,
                        failOnHint: false,
                        resourcePath: 'src'
                    },

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
