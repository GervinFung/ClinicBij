const each = require('jest-each').default;

import {userNameTaken} from '../../src/logic/tempUserList';
import {checkUsernameMinLength, checkUsernameNoWhitespace} from '../../src/logic/userName';

describe('test user name minimum length', () => {
    each([
        ['TayMingLiang123!@#', true],
        ['username', true],
        ['user123', true],
        ['user', false],
    ]).it("when the user name is %s", (userName, expected) => {
        expect(checkUsernameMinLength(userName)).toBe(expected);
    });
});


describe('test user name white space regex', () => {
    each([
        ['TayMingLiang123!@# ', true],
        ['username', false],
        ['use r123', true],
        ['user with space', true],
        ['user with tab', true],
        ['NgKhee Long123!@#', true],
    ]).it("when the user name is %s", (userName, expected) => {
        expect(checkUsernameNoWhitespace(userName)).toBe(expected);
    });
});


describe('test user name exists', () => {
    each([
        ['TayMingLiang123!@#', true],
        ['NgKheeLong123!@#', true],
        ['KohRongSoon123!@#', true],
        ['WongYeeJing123!@#', true],
        ['GervinFungDaXuen123!@#', true],
    ]).it("when the existing user name is %s", (userName, expected) => {
        expect(userNameTaken(userName)).toBe(expected);
    });
});

describe('test user name does not exists', () => {
    each([
        ['NoobMaster69', false],
        ['GervinFungDaXuen123', false],
        ['KohRongSoon123', false],
    ]).it("'when the oon-existing user name card is %s", (userName, expected) => {
        expect(userNameTaken(userName)).toBe(expected);
    });
});