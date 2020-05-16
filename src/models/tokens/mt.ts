import { Token } from "./token.interface";

/**
 * This appears to be a title element
 */
export class Mt implements Token {
    private readonly _tagType = '\\mt';
    _value: string;

    constructor (value: string) {
        this._value = value.substr(3, value.length - 3).trim();
    }

    append(value: string) {
        this._value += ` ${value.trim()}`;
    }
}