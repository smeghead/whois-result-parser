const dayjs = require('dayjs');

class WhoisResultParser {
    constructor(domainName, result) {
        if ( ! domainName) {
            throw new Exception('ERROR: domainName is required.');
        }
        this.domainName = domainName
        if ( ! result) {
            throw new Exception('ERROR: result is required.');
        }
        this.result = result
    }

    parse() {
        console.log(this.result);
        const lines = this.result.split(/[\r\n]+/);

        const rootDomain = this.domainName.replace(/^.*\.([^\.]*)$/, '$1');
        let rule = defaultRule;
        console.log(rootDomain);
        if (rootDomain in rules) {
            rule = rules[rootDomain];
        }
        console.log(rule);
        const whois = {};
        for (const key in rule) {
            whois[key] = searchPropertyValue(lines, key, rule[key]);
        }
        return whois;
    }
}

const defaultRule = {
    'domainName': /^Domain Name: *([^\s]+)/,
    'registrar': /^Registrar: *(.+)/,
    'updatedDate': /^Updated Date: *(.+)/,
    'creationDate': /^Creat(?:ed|ion) Date: *(.+)/,
    'expirationDate': /Expir\w+ Date: *(.+)/,
};
const rules = {
    jp: {
        'domainName': /^\[Domain Name\]\s+([^\s]+)/,
        'registrar': /^\[登録年月日\]\s+(.+)$/,
        'updatedDate': /^\[最終更新\]\s+(.+)$/,
        'creationDate': /^\[登録年月日\]\s+(.+)$/,
        'expirationDate': /^\[有効期限\]\s+(.+)$/,
    },
};

const searchPropertyValue = (lines, key, regex) => {
    const values = lines.map(line => {
        const matches = line.match(regex);
        if ( ! matches) {
            return null;
        }
        let val = matches[1];
        if (key.endsWith('Date')) {
            if (val) {
                const d = dayjs(val);
                val = d.format();
            }
        }
        return val;
    }).filter(val => val);
    if (values.length === 0) {
        return null;
    }
    console.log(values);
    return values[0];
};

module.exports = WhoisResultParser;
// vim: set expandtab ts=4 sts=4 sw=4:
