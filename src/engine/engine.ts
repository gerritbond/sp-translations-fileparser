import * as fs from 'fs';
import * as readline from 'readline';
import { RefParser, MtParser, DParser, FParser, Parser } from '../parsers';
import { Ref, Token } from '../models';
import { Output, Formats } from '../output';

export class Engine {
    private readonly _filepath: string;
    private readonly _parsers: Parser[];

    private readonly isTokenRe = /^\\.*$/;
    private readonly emptyLineRe = /^\s*$/;
    private readonly references: Ref[] = [];


    constructor (filepath: string) {
        this._filepath = filepath;

        this._parsers = [
            new RefParser(),
            new MtParser(),
            new DParser(),
            new FParser()
        ]
    }

    async process () {
        if(! fs.existsSync(this._filepath))
            throw `Cannot process ${this._filepath}. No such file.`;

        const stream = fs.createReadStream(this._filepath);

        const r1 = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        let successLastLine = false;
        for await (const line of r1) {
            if(!this.emptyLineRe.test(line)) {
                if(this.isTokenRe.test(line))
                    successLastLine = this.parse(line);
                else if (successLastLine)
                    this.references[this.references.length - 1].append(line);
            } else {
                successLastLine = false;
            }
        }

        this.output();
    }

    private parse (line: string): boolean {
        return this._parsers
            .filter(p => p.matches(line))
            .some(p => this.addToResult(p.parse(line))) || false;
    }

    private addToResult (token: Token): boolean {
        if(token instanceof Ref)
            this.references.push(token);
        else if (this.references.length)
            this.references[this.references.length - 1].addChild(token);
        else {
            console.warn("Attempting to add a token to the result set, but no Refs exist to attach to.");
            return false;
        }
    
        return true;
    }

    private output (): void {
        const output: Output = new Output(this.references);
        
        output
            .startFile('./output', 'native.txt')
            .format(Formats.TEXT)
            .writeTitle()
            .writeNativeText()
            .flush();

        output
            .startFile('./output', 'translated.txt')
            .format(Formats.TEXT)
            .writeTitle()
            .writeTranslatedText();

        output
            .debug('./output', 'out.json');
    }
}