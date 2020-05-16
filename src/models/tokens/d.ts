import { Token } from "./token.interface";

/**
 * This tag has the original language version of the line
 */
export class D implements Token {
    private readonly _tagType = '\\d';
    _value: string;

    constructor (value: string) {
        this._value = value.substr(2, value.length - 2).trim();
    }
    
    append(value: string) {
        this._value += ` ${value.trim()}`
    }
    
}