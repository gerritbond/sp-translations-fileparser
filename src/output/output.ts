import { Ref } from "../models/tokens/ref";
import { WriteStream } from 'fs';
import * as fs from 'fs';
import { Formats } from "./format";

export class Output {
    private refs: Ref[];
    

    private stream: WriteStream;

    constructor (r: Ref[]) {
        this.refs = r;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format (format: Formats) {
        console.warn("Specific formatting not currently implemented; will not alter output.");
        return this;
    }

    startFile (directory: string, file: string) {
        if(!fs.existsSync(directory))
            fs.mkdirSync(directory);

        if(!fs.existsSync(`${directory}/${file}`))
            fs.writeFileSync(`${directory}/${file}`, '');

        this.stream = fs.createWriteStream(`${directory}/${file}`, { flags: 'w'});

        return this;
    }

    debug (directory: string, file : string) {
        if(!fs.existsSync(directory))
            fs.mkdirSync(directory);

        if(!fs.existsSync(`${directory}/${file}`))
            fs.writeFileSync(`${directory}/${file}`, '');

        fs.writeFileSync(`${directory}/${file}`, JSON.stringify(this, null, 2));
    }

    flush () {
        this.stream.close();
    }

    writeTitle () {
        this.refs.forEach(r => {
            const title = r.children.filter(c => c._tagType === "\\mt").pop();
        
            if(title) {
                this.stream.write(`${title._value}\r\n`);
                return this;
            }
        })

        return this;
    }

    writeNativeText () {
        const nativeTextLines = [];

        this.refs.forEach(r => {
            r.children.filter(c => c._tagType === "\\d").forEach(d => nativeTextLines.push(d?._value))
        });

        this.stream.write(nativeTextLines.join("\r\n"));

        return this;
    }

    writeTranslatedText () {
        const translatedText = [];

        this.refs.forEach(r => {
            const nativeText: string [] = r.children.filter(c => c._tagType === "\\d").map(d => d?._value);
            const translations: string [] = r.children.filter(c => c._tagType === "\\f").map(f => f?._value);

            let t = "===============================\r\n";
            t += nativeText.join("\r\n");
            t += "\r\n"
            t += "----\r\n"
            t += "\r\n"
            t += translations.join("\r\n");
            t += "\r\n===============================\r\n";
        
            translatedText.push(t);
        });

        this.stream.write(translatedText.join("\r\n"));

        return this;
    }
}