import { Token } from "./token.interface";

export class Ref implements Token {
    readonly _tagType = '\\ref';
    readonly children = [];
    
    baseName: string;
    part: number;
    step: number;

    append(value: string) {
        if(this.children.length)
            this.children[this.children.length - 1].append(value);
    }

    addChild (child: Token) {
        this.children.push(child);
    }
}