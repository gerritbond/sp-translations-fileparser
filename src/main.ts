import { Engine } from './engine/engine';
import * as yargs from 'yargs';

const argv = yargs
    .command("from <sourceFile> [value]", "Begins loading and processing the specified file.", {
        sourceFile: {
            description: "Exact file path to read in input",
            type: "string",
            alias: ["f"]
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let engine : Engine;

if(argv._.includes("from")) {        
    engine = new Engine(argv.sourceFile as string);
} else {
    throw "Must provided a source file"
}

engine.process();

console.log("Thanks for using this parser! Have a great day!");