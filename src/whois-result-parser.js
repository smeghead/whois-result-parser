class WhoisResultParser {
    constructor(result) {
        this.result = result
    }

    parse() {
        return {
            domainName: 'GOOGLE.COM',
            "updatedDate": "",
            "creationDate": "1997-09-15T00:00:00-0700",
            "expirationDate": "2020-09-13T21:00:00-0700"
        };
    }
}


module.exports = WhoisResultParser;
// vim: set expandtab ts=4 sts=4 sw=4:
