const each = require('jest-each').default;

import {checkEmailValid} from '../../src/logic/email';

describe('test valid email', () => {
    each([
        ['taymingliang@gmail.com', true],
        ['123456@a.com', true],
        ['taymingliang@1utar.my', true],
        ['gervinfungdaxuen@yahoo.com', true],
        ['ngkheelong@1.com', true],
        ['apple12345@edu.my', true],
    ]).it('when the valid email is %s', (email, expected) => {
        expect(checkEmailValid(email)).toBe(expected);
    });
});

describe('test invalid email', () => {
    each([
        ['', false],
        ['testing123@g', false],
        ['123testing@', false],
        ['apple12345!@#@edu.my', false],
        ['taymingl!@#$%iang@gmail.com', false],
        ['@#$%^&gervinfungdaxuen@yahoo.com', false],
    ]).it("'when the invalid email is %s", (email, expected) => {
        expect(checkEmailValid(email)).toBe(expected);
    });
});
