#!/usr/bin/env node

/**
 * Install all plugins listed in package.json
 * https://raw.githubusercontent.com/diegonetto/generator-ionic/master/templates/hooks/after_platform_add/install_plugins.js
 */
var exec = require('child_process').exec;
var sys = require('sys');

var packageJSON = null;

try {
  packageJSON = require('../../package.json');
} catch (ex) {
  console.log('\nThere was an error fetching your package.json file.');
  console.log('\nPlease ensure a valid package.json is in the root of this project\n');
  return;
}

packageJSON.cordovaPlugins = packageJSON.cordovaPlugins || [];
packageJSON.cordovaPlugins.forEach(function(plugin) {
  exec('cordova plugin add ' + plugin, function(error, stdout) {
    sys.puts(stdout);
  });
});
