import { Parser } from "./parser.interface";
import { F } from "../models/tokens/f";

export class FParser implements Parser {
    private readonly re: RegExp = /\\f\s.*/;

    matches(line: string): boolean {
        return this.re.test(line);
    }

    parse(line: string): F {
        return new F (line);
    }   
}