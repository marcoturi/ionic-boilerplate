import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
import * as chalk from "chalk";

let importsContent:string[] = [];
let index: any = {
    header: "/* Module Index Entry - generated using the script npm run generate-index */\n",
    path: path.resolve(__dirname, "../src", "index.ts")
};

let pathTsFiles = path.resolve(__dirname, "../src")+"/**/**/*.ts";
let filesToAdd = glob.sync(pathTsFiles, {
     nodir: true, 
     ignore: [path.dirname(pathTsFiles)+'/index.ts', path.dirname(pathTsFiles)+'/!(*.spec).ts'] 
});

importsContent = importsContent.concat(filesToAdd.map((file) => {
    console.log(chalk.green("ADDING IMPORT FILE: ", chalk.cyan(file), " TO: ",chalk.cyan('src/index.ts')));
    return `import '${file.replace('.ts','')}';\n`;
}), importsContent);

fs.writeFileSync(index.path, index.header + importsContent.join(""));
