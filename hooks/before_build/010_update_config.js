#!/usr/bin/env node

// Save hook under `project-root/hooks/before_prepare/`
// https://gist.github.com/ohh2ahh/f35ff6e0d9f8b4268cdb
// Don't forget to install xml2js using npm
// `$ npm install xml2js`

var fs = require('fs');
var xml2js = require('xml2js');
var packageJson = require('../../package.json');

// Read config.xml
fs.readFile('config.xml', 'utf8', function(err, data) {
    if(err) {
        return console.log(err);
    }

    // Get XML
    var xml = data;

    // Parse XML to JS Obj
    xml2js.parseString(xml, function (err, result) {
        if(err) {
            return console.log(err);
        }
        // Get JS Obj
        var obj = result;
        obj['widget']['$']['version'] = packageJson.version;
        // console.log(obj);
        // Build XML from JS Obj
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(obj);

        // Write config.xml
        fs.writeFile('config.xml', xml, function(err) {
            if(err) {
                return console.log(err);
            }

            //console.log('Build number successfully incremented');
        });

    });
});
