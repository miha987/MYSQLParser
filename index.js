var MYSQLParser = require('./src/mysql-parser.js');

const createParser = () => {
    return new MYSQLParser();
}

module.exports = createParser;