/**
 * If you are not using rollup to build your ionic app, this configuration will not affect your code,
 * se webpack.config.js instead.
 */

const rollupConfig = require('../node_modules/@ionic/app-scripts/config/rollup.config');
const replace = require('rollup-plugin-replace');

console.log('Editing rollup configuration to inject env');

const nodeEnv = JSON.stringify(process.env.NODE_ENV) || 'development';
const apiUrl = JSON.stringify(process.env.API_URL) || '';
const platform = JSON.stringify(process.env.PLATFORM) || 'android';

rollupConfig.plugins.push(replace({
    'process.env.NODE_ENV': nodeEnv,
    'process.env.API_URL': apiUrl,
    'process.env.PLATFORM': platform
}));

module.exports = rollupConfig;
