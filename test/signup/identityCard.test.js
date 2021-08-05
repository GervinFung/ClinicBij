const each = require('jest-each').default;

import {checkIdentityCardValid} from '../../src/logic/identityCard';

describe('test valid identity card', () => {
    each([
        ['123456-12-0987', true],
        ['123456-00-1234', true],
        ['180165-12-1233', true],
        ['220904-98-0232', true],
    ]).it("when the valid identity card is %s", (email, expected) => {
        expect(checkIdentityCardValid(email)).toBe(expected);
    });
});

describe('test invalid identity card', () => {
    each([
        ['', false],
        ['123456-120987', false],
        ['12345600-1234', false],
        ['180165121233', false],
        ['220904-9a-0232', false],
        ['acbasd-11-1111', false],
    ]).it("'when the invalid identity card is %s", (email, expected) => {
        expect(checkIdentityCardValid(email)).toBe(expected);
    });
});