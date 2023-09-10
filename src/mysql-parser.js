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