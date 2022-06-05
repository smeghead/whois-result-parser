const fs = require('fs');
const WhoisResultParser = require('../dist/whois-result-parser');

test('initialize', () => {
    const raw = fs.readFileSync('./test/data/google.com.txt');
    const parser = new WhoisResultParser('google.com', raw);
    expect(parser).not.toBe(null);
});

const checkAnswer = (actual, expected) => {
    expect(actual.domainName).toBe(expected.domainName);
    expect(actual.updatedDate).toBe(expected.updatedDate);
    expect(actual.creationDate).toBe(expected.creationDate);
    expect(actual.expirationDate).toBe(expected.expirationDate);
};
fs.readdirSync('./test/data').filter(name => name.endsWith('.txt')).forEach(file => {
    test(`test all domains ${file}`, () => {
            const raw = fs.readFileSync(`./test/data/${file}`, 'utf-8');
            const answer = fs.readFileSync(`./test/data/${file.replace(/\.txt$/, '.json')}`, 'utf-8');
            const parser = new WhoisResultParser(`${file.replace(/\.txt$/, '')}`, raw);
            checkAnswer(parser.parse(), JSON.parse(answer));
    });
});
// vim: set expandtab ts=4 sts=4 sw=4:
