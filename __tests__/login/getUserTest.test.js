const each = require('jest-each').default;

import {getUserFromUserList} from '../../src/logic/tempUserList';

describe('test user exists in user list', () => {
    each([
        ['TayMingLiang123@gmail.com','TayMingLiang123!@#'],
        ['NgKheeLong123!@gmail.com', 'NgKheeLong123!@#'],
        ['KohRongSoon123!@gmail.com', 'KohRongSoon123!@#'],
        ['WongYeeJing123!@gmail.com', 'WongYeeJing123!@#'],
        ['gervinfungdaxuen@gmail.com', '123456A$'],
    ]).it('when the password is %s', (email, password) => {
        const expected = {
            email: email,
            password: password,
        };
        expect(getUserFromUserList(email, password)).toMatchObject(expected);
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
    ]).it('when the password is %s', (email, password) => {
        expect(getUserFromUserList(email, password)).toBe(undefined);
    });
});
