const dayjs = require('dayjs');

class WhoisResultParser {
    private domainName: string;
    private result: string;

    constructor(domainName: string, result: string) {
        if ( ! domainName) {
            throw new Error('ERROR: domainName is required.');
        }
        this.domainName = domainName
        if ( ! result) {
            throw new Error('ERROR: result is required.');
        }
        this.result = result
    }

    parse(): ParseResult {
        const lines = this.result.split(/[\r\n]+/);

        const topLevelDomain = this.domainName.replace(/^.*\.([^\.]*)$/, '$1');
        let rule = defaultRule;
        if (topLevelDomain in rules) {
            rule = rules[topLevelDomain];
        }
//         console.log(rule);
        const whois: {[key: string]: any} = {};
        for (const key in rule) {
            const obj: {[key: string]: RegExp} = rule;
            whois[key] = searchPropertyValue(lines, key, obj[key]);
        }
        return whois as ParseResult;
    }
}

type ParseResult = {
    'domainName': string;
    'updatedDate': string|null;
    'creationDate': string|null;
    'expirationDate': string|null;
}

type Rule = {
    'domainName': RegExp;
    'updatedDate': RegExp;
    'creationDate': RegExp;
    'expirationDate': RegExp;
}

const defaultRule: Rule = {
    'domainName': /^Domain Name: *([^\s]+)/,
    'updatedDate': /^Updated Date: *(.+)/,
    'creationDate': /^Creat(?:ed|ion) Date: *(.+)/,
    'expirationDate': /Expir\w+ Date: *(.+)/,
};
const rules: {[key: string]: Rule} = {
    jp: {
        'domainName': /^\[Domain Name\]\s+([^\s]+)/,
        'updatedDate': /^\[最終更新\]\s+(.+)$/,
        'creationDate': /^\[登録年月日\]\s+(.+)$/,
        'expirationDate': /^\[有効期限\]\s+(.+)$/,
    },
    edu: {
        'domainName': /^Domain Name: *([^\s]+)/,
        'updatedDate': /^Domain record last updated: *(.+)/,
        'creationDate': /^Domain record activated: *(.+)/,
        'expirationDate': /^Domain expires: *(.+)/,
    },
    int: {
        'domainName': /^domain: *([^\s]+)/,
        'updatedDate': /^changed: *(.+)/,
        'creationDate': /^created: *(.+)/,
        'expirationDate': /^Domain expires: *(.+)/,
    },
    cn: {
        'domainName': /^Domain Name: *([^\s]+)/,
        'updatedDate': /^changed: *(.+)/,
        'creationDate': /^Registration Time: *(.+)/,
        'expirationDate': /^Expiration Time: *(.+)/,
    },
    id: {
        'domainName': /^Domain Name: *([^\s]+)/,
        'updatedDate': /^Last Updated On: *(.+)/,
        'creationDate': /^Created On: *(.+)/,
        'expirationDate': /^Expiration Date: *(.+)/,
    },
};

const searchPropertyValue = (lines: string[], key: string, regex: RegExp): string|null => {
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
//     console.log(values);
    return values[0];
};

module.exports = WhoisResultParser;
// vim: set expandtab ts=4 sts=4 sw=4:
