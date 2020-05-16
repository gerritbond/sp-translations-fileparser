import { Token } from "./token.interface";

/**
 * This tag has translations of the native text
 */
export class F implements Token {
    private readonly _tagType = '\\f';
    _value: string;

    constructor (value: string) {
        this._value = value.substr(2, value.length - 2).trim();
    }
    
    append(value: string) {
        this._value += ` ${value.trim()}`
    }
    
}