const each = require('jest-each').default;

import {getUserFromUserList} from '../../src/logic/tempUserList';

describe('test user exists in user list', () => {
    each([
        ['TayMingLiang123!@#', 'TayMingLiang123!@#'],
        ['NgKheeLong123!@#', 'NgKheeLong123!@#'],
        ['KohRongSoon123!@#', 'KohRongSoon123!@#'],
        ['WongYeeJing123!@#', 'WongYeeJing123!@#'],
        ['GervinFungDaXuen123!@#', 'GervinFungDaXuen123!@#'],
    ]).it("when the password is %s", (userName, password) => {
        expected = {
            userName: userName,
            password: password
        }
        expect(getUserFromUserList(userName, password)).toMatchObject(expected);
    });
});

describe('test user does not exists in user list', () => {
    each([
        ['xyx', 'xyz'],
        ['xyx', '231xyz'],
        ['xyx123', 'xyz'],
        ['KohRongSoon123', 'KohRongSoon123'],
        ['WongYeeJing', 'WongYeeJing123!@#'],
        ['GervinFungDaXuen123!@#', 'GervinFungDaXuen123'],
    ]).it("when the password is %s", (userName, password) => {
        expect(getUserFromUserList(userName, password)).toBe(undefined);
    });
});