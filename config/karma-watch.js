var chokidar = require('chokidar');
var replace = require("replace");

let listOfFiles = '';
const mod = '// toreplace';

chokidar.watch('src/**/*.spec.ts').on('all', (event, path) => {
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
