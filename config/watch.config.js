const watchConfig = require('../node_modules/@ionic/app-scripts/config/watch.config');
const _ = require('lodash');

console.log('Editing watch for ignoring spec and e2e files');

_.forEach(watchConfig.watchers, (watch) =>{
    if(watch.paths.indexOf('src/**/*.ts') > -1) {
        watch.options = {
            ignored: /(.*(?=\.spec|\.e2e).*?\.ts)/
        };
    }
});

// console.log(watchConfig.watchers[0]);

module.exports = watchConfig;
