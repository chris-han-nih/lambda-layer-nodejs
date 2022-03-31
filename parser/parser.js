class Parser {
    static async csv2json(data) {
        return await require('csvtojson/v2')().fromString(data);
    }

    static json2csv(data) {
        return require('json2csv').parse(data);
    }

    static async xml2json(data) {
        return await require('xml2js')().Parser().parserStringPromise(data);
    }
}

module.exports = {Parser}
