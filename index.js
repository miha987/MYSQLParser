var MYSQLParser = require('./src/mysql_parser.js');

const createParser = () => {
    return new MYSQLParser();
}

module.exports = createParser;