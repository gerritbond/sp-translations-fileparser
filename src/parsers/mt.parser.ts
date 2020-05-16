import { Parser } from "./parser.interface";
import { Mt } from "../models/tokens/mt";

export class MtParser implements Parser {
    private readonly re: RegExp = /\\mt.*/;

    matches(line: string): boolean {
        return this.re.test(line);
    }
    
    parse(line: string): Mt {
        return new Mt (line);
    }
}