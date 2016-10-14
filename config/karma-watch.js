const chokidar = require('chokidar');
const replace = require('replace');
const argv = require('minimist')(process.argv.slice(2), {boolean: ['persistent']});

const persistent = argv.persistent || false;
const mod = '// toreplace';
let listOfFiles = '';

chokidar.watch('src/**/*.spec.ts',{
    ignored: /[\/\\]\./,
    persistent: persistent
}).on('all', (event, path) => {
    // console.log(event, path);

    const importFile = `import '../${path.replace('.ts', '')}';\n`;

    if(event === 'add') {
        listOfFiles += importFile;
    } else if(event === 'unlink') {
        listOfFiles = listOfFiles.replace(importFile, '');
    }

    // console.log(mod + '\n' + listOfFiles + mod);

    replace({
        regex: /\/\/ toreplace[\s\S]*\/\/ toreplace/,
        replacement: mod + '\n' + listOfFiles + mod,
        paths: ['config/karma-shim.ts'],
        recursive: true,
        silent: true,
    });
});
