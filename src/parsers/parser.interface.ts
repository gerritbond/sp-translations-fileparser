import { Token } from "../models/tokens/token.interface";

export interface Parser {
    matches(line: string): boolean;
    parse(line: string): Token;
}