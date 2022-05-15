const fs = require('fs');
const WhoisResultParser = require('../src/whois-result-parser');

test('initialize', () => {
    const raw = fs.readFileSync('./test/data/google.com');
    const parser = new WhoisResultParser(raw);
    expect(parser).not.toBe(null);
});

const checkAnswer = (actual, expected) => {
    expect(actual.domainName).toBe(expected.domainName);
    expect(actual.updatedDate).toBe(expected.updatedDate);
    expect(actual.creationDate).toBe(expected.creationDate);
    expect(actual.expirationDate).toBe(expected.expirationDate);
};
test('initialize', () => {
    const raw = fs.readFileSync('./test/data/google.com');
    const answer = fs.readFileSync('./test/data/google.com.json');
    const parser = new WhoisResultParser(raw);
    checkAnswer(parser.parse(), JSON.parse(answer));
});
// vim: set expandtab ts=4 sts=4 sw=4:
