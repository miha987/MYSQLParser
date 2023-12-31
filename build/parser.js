(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MYSQLParser = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var MYSQLParser = require('./src/mysql-parser.js');

const createParser = () => {
    return new MYSQLParser();
}

module.exports = createParser;
},{"./src/mysql-parser.js":2}],2:[function(require,module,exports){
var Tokenizer = require('./tokenizer.js');

class MYSQLParser {

    constructor() {
    }
    
    parse(text) {
        // console.log("PARSING TEXT", text);
        
        let tokenizer = new Tokenizer(text);

        let tokens = [];

        while(!tokenizer.hasFinished()) {
            let nextToken = tokenizer.getNextToken();
            
            tokens.push(nextToken);
        }
        
        console.log("TOKENS ARR", tokens);

    }
}

module.exports = MYSQLParser;
},{"./tokenizer.js":3}],3:[function(require,module,exports){
class Token {
    type;
    value;

    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class IntegerLiteralToken extends Token {
    constructor(value) {
        super("INTEGER_LITERAL", value);
    }
}

class StringLiteralToken extends Token {
    constructor(value) {
        super("STRING_LITERAL", value);
    }
}

class IdentifierToken extends Token {
    constructor(value) {
        super("IDENTIFIER_LITERAL", value);
    }
}

const tokenParsingRules = [
    {
        regex: /^([0-9])+/g,
        type: IntegerLiteralToken
    },
    {
        regex: /^[a-zA-Z]+[a-zA-Z0-9]*/g,
        type: IdentifierToken
    },
    {
        regex: /^"[a-zA-Z0-9]*"/g,
        type: StringLiteralToken
    }
];

class Tokenizer {
    _text;
    _cursor = 0;

    constructor(text) {
        this._text = text;

        // console.log("NEW TOKENIZER FOR", this._text);
    }

    hasFinished() {
        return this._cursor >= this._text.length-1;
    }

    getNextToken() {
        console.log("GETTING NEXT TOKEN");
        let textFromCursor = this._text.substring(this._cursor);

        let token = undefined;

        for (let index = 0; index < tokenParsingRules.length; index++) {
            const parsingRule = tokenParsingRules[index];
            
            let ruleMatches = textFromCursor.match(parsingRule.regex);

            if (ruleMatches) {
                let tokenValue = ruleMatches[0];
                this._cursor += tokenValue.length;

                if (parsingRule.type) {
                    token = new parsingRule.type(tokenValue);
                }

                return token;
            }
        }

        // IF THERE WERE NO MATCHES, ADVANCE CURSOR FOR 1
        this._cursor += 1; 

        return undefined;

        // let integerLiteralMatches = textFromCursor.match(/^([0-9])+/g); 
        
        // let identifierMatches = textFromCursor.match(/^[a-zA-Z]+[a-zA-Z0-9]*/g); 
        
        // if (integerLiteralMatches) {
        //     let tokenValue = integerLiteralMatches[0];
        //     this._cursor += tokenValue.length;

        //     token = new IntegerLiteralToken(tokenValue);
            
        //     // console.log("FOUND INTEGER LITERAL TOKEN", token);
        // } else if (identifierMatches) {
        //     let tokenValue = identifierMatches[0];
        //     this._cursor += tokenValue.length;

        //     token = new IdentifierToken(tokenValue);
            
        //     // console.log("FOUND IDENTIFIER TOKEN", token);
        // } else {
        //     this._cursor += 1; // TODO - THIS IS DEBUG ONLY. PROPABLY CAN BE DONE BETTER?
        // }

        // return token;
    }
}

module.exports = Tokenizer;
},{}]},{},[1])(1)
});
