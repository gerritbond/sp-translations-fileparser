import { Parser } from "./parser.interface";
import { D } from "../models/tokens/d";

export class DParser implements Parser {
    private readonly re: RegExp = /\\d\s.*/;

    matches(line: string): boolean {
        return this.re.test(line);
    }

    parse(line: string): D {
        return new D (line);
    }   
}