const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


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
            const obj: {[key: string]: ValueFinder} = rule;
            whois[key] = obj[key].find(lines);
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
interface ValueFinder {
    regex: RegExp;
    find(lines: string[]): string|null;
}
class StringValueFinder implements ValueFinder {
    regex: RegExp;

    constructor(regex: RegExp) {
        this.regex = regex;
    }
    find(lines: string[]): string|null {
        if (this.regex.multiline) {
            const matches = lines.join('\n').match(this.regex);
            if ( ! matches) {
                return null;
            }
            let val = matches[1];
            return val;
        }
        const values = lines.map(line => {
            const matches = line.match(this.regex);
            if ( ! matches) {
                return null;
            }
            let val = matches[1];
            return val;
        }).filter(val => val);
        if (values.length === 0) {
            return null;
        }
        return values[0];
    }
}
class DateValueFinder implements ValueFinder {
    regex: RegExp;
    format: string;

    constructor(regex: RegExp, format: string) {
        this.regex = regex;
        this.format = format;
    }
    find(lines: string[]): string|null {
        const values = lines.map(line => {
            const matches = line.match(this.regex);
            if ( ! matches) {
                return null;
            }
            let val = matches[1];
            if (val) {
                const d = this.format.length > 0 ? dayjs(val, this.format) : dayjs(val);
                val = d.format();
            }
            return val;
        }).filter(val => val);
        if (values.length === 0) {
            return null;
        }
    //     console.log(values);
        return values[0];
    }
}
type Rule = {
    'domainName': ValueFinder;
    'updatedDate': ValueFinder;
    'creationDate': ValueFinder;
    'expirationDate': ValueFinder;
}

const defaultRule: Rule = {
    'domainName': new StringValueFinder(/^Domain Name: *([^\s]+)/),
    'updatedDate': new DateValueFinder(/^Updated Date: *(.+)/, ''),
    'creationDate': new DateValueFinder(/^Creat(?:ed|ion) Date: *(.+)/, ''),
    'expirationDate': new DateValueFinder(/Expir\w+ Date: *(.+)/, ''),
};
const rules: {[key: string]: Rule} = {
    jp: {
        'domainName': new StringValueFinder(/^\[Domain Name\]\s+([^\s]+)/),
        'updatedDate': new DateValueFinder(/^\[最終更新\]\s+(.+)$/, ''),
        'creationDate': new DateValueFinder(/^\[登録年月日\]\s+(.+)$/, ''),
        'expirationDate': new DateValueFinder(/^\[有効期限\]\s+(.+)$/, ''),
    },
    edu: {
        'domainName': new StringValueFinder(/^Domain Name: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^Domain record last updated: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^Domain record activated: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^Domain expires: *(.+)/, ''),
    },
    int: {
        'domainName': new StringValueFinder(/^domain: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^changed: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^created: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^Domain expires: *(.+)/, ''),
    },
    cn: {
        'domainName': new StringValueFinder(/^Domain Name: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^changed: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^Registration Time: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^Expiration Time: *(.+)/, ''),
    },
    id: {
        'domainName': new StringValueFinder(/^Domain Name: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^Last Updated On: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^Created On: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^Expiration Date: *(.+)/, ''),
    },
    br: {
        'domainName': new StringValueFinder(/^domain: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^changed: *(\d{8})/, ''),
        'creationDate': new DateValueFinder(/^created: *(\d{8})/, ''),
        'expirationDate': new DateValueFinder(/^expires: *(\d{8})/, ''),
    },
    tk: {
        'domainName': new StringValueFinder(/Domain name:\s*(\S+)/m),
        'updatedDate': new DateValueFinder(/^changed: *(\d{8})/, ''),
        'creationDate': new DateValueFinder(/Domain registered: *([\S]+)/, ''),
        'expirationDate': new DateValueFinder(/Record will expire on: *([\S]+)/, ''),
    },
    de: {
        'domainName': new StringValueFinder(/^Domain: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^Changed: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^Created: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^Domain expires: *(.+)/, ''),
    },
    au: {
        'domainName': new StringValueFinder(/^Domain Name: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^Last Modified: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^Created: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^Domain expires: *(.+)/, ''),
    },
    ru: {
        'domainName': new StringValueFinder(/^domain: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^Last updated on *(\S+)/, ''),
        'creationDate': new DateValueFinder(/^created: *(\S+)/, ''),
        'expirationDate': new DateValueFinder(/^paid-till: *(\S+)/, ''),
    },
    uk: {
        'domainName': new StringValueFinder(/Domain name:\s*(\S+)/m),
        'updatedDate': new DateValueFinder(/Last updated: *(\S+)/, ''),
        'creationDate': new DateValueFinder(/Registered on: *([\S]+)/, ''),
        'expirationDate': new DateValueFinder(/Expiry date: *([\S]+)/, ''),
    },
    fr: {
        'domainName': new StringValueFinder(/^domain: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^last-update: *(\S+)/, ''),
        'creationDate': new DateValueFinder(/^created: *(\S+)/, ''),
        'expirationDate': new DateValueFinder(/^Expiry Date: *(\S+)/, ''),
    },
    nl: {
        'domainName': new StringValueFinder(/^Domain name: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^Updated Date: *(\S+)/, ''),
        'creationDate': new DateValueFinder(/^Creation Date: *(\S+)/, ''),
        'expirationDate': new DateValueFinder(/^Expiry Date: *(\S+)/, ''),
    },
    fi: {
        'domainName': new StringValueFinder(/^domain.............: *([^\s]+)/),
        'updatedDate': new DateValueFinder(/^modified...........: *(.+)/, 'D.M.YYYY hh:mm:ss'),
        'creationDate': new DateValueFinder(/^created............: *(.+)/, 'D.M.YYYY hh:mm:ss'),
        'expirationDate': new DateValueFinder(/^expires............: *(.+)/, 'D.M.YYYY hh:mm:ss'),
    },
    pl: {
        'domainName': new StringValueFinder(/^DOMAIN NAME: *(\S+)/),
        'updatedDate': new DateValueFinder(/^last modified: *(.+)/, 'YYYY.MM.DD hh:mm:ss'),
        'creationDate': new DateValueFinder(/^created: *(.+)/, 'YYYY.MM.DD hh:mm:ss'),
        'expirationDate': new DateValueFinder(/^renewal date: *(.+)/, 'YYYY.MM.DD hh:mm:ss'),
    },
    ee: {
        'domainName': new StringValueFinder(/^Domain:\s*name: *(\S+)/m),
        'updatedDate': new DateValueFinder(/^changed: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^registered: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^expire: *(.+)/, ''),
    },
    kr: {
        'domainName': new StringValueFinder(/^Domain Name\s*: *(\S+)/),
        'updatedDate': new DateValueFinder(/^Last Updated Date\s*: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^Registered Date\s*: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^Expiration Date\s*: *(.+)/, ''),
    },
    kg: {
        'domainName': new StringValueFinder(/^Domain\s*(\S+)/),
        'updatedDate': new DateValueFinder(/^Record last updated on: *(.+)/, ''),
        'creationDate': new DateValueFinder(/^Record created: *(.+)/, ''),
        'expirationDate': new DateValueFinder(/^Record expires on: *(.+)/, ''),
    },


};

module.exports = WhoisResultParser;
// vim: set expandtab ts=4 sts=4 sw=4:
