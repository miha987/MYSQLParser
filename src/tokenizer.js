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