const each = require('jest-each').default;

import {checkPasswordMinLength, checkPasswordContainUpperCase, checkPasswordContainInteger, checkPasswordContainSymbol} from '../../src/logic/password';

describe('test password minimum length', () => {
    each([
        ['1234abcd910', true],
        ['123456', true],
        ['12345', false],
        ['abcdef', true],
        ['abcde', false],
        ['!@#$%123ac', true],
        ['!@#$%^', true],
        ['!@#$%', false],
    ]).it('when the password is %s', (password, expected) => {
        expect(checkPasswordMinLength(password)).toBe(expected);
    });
});

describe('test password has at least 1 upper-case', () => {
    each([
        ['As', true],
        ['as', false],
        ['as Always', true],
        ['a1', false],
        ['1S', true],
    ]).it("'when the password is %s", (password, expected) => {
        expect(checkPasswordContainUpperCase(password)).toBe(expected);
    });
});

describe('test password has at least 1 number', () => {
    each([
        ['123', true],
        ['!@#$%1', true],
        ['1abcd123', true],
        ['abc', false],
        ['!@#$', false],
    ]).it("'when the password is %s", (password, expected) => {
        expect(checkPasswordContainInteger(password)).toBe(expected);
    });
});

describe('test password has at least 1 symbol', () => {
    each([
        ['!', true],
        ['abc 123', true],
        ['1234 abc', true],
        ['!@#$%^', true],
    ]).it("'when the password is %s", (password, expected) => {
        expect(checkPasswordContainSymbol(password)).toBe(expected);
    });
});
