import { Parser } from "./parser.interface";
import { Ref } from "../models/tokens/ref";

export class RefParser implements Parser {
    private readonly re: RegExp = /\\ref.*/;
    
    matches(line: string): boolean {

        return this.re.test(line);
    }

    parse(line: string): Ref {
        const ref: Ref = new Ref();
        ref.baseName = line.substr(5, 6);
        ref.part = parseInt(line.substr(11, 2));
        ref.step = parseInt(line.substr(14, 2));

        return ref;
    }
}