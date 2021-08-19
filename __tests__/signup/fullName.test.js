const each = require('jest-each').default;

import {emailTaken} from '../../src/logic/tempUserList';
import {checkUsernameMinLength} from '../../src/logic/fullName';

describe('test full name minimum length', () => {
    each([
        ['Tay Ming Liang', true],
        ['Mohammand Ali', true],
        ['Wong Chim Ciw', true],
        ['Lo', false],
    ]).it('when the full name is %s', (fullName, expected) => {
        expect(checkUsernameMinLength(fullName)).toBe(expected);
    });
});

describe('test email taken exists', () => {
    each([
        ['TayMingLiang123@gmail.com', true],
        ['NgKheeLong123!@gmail.com', true],
        ['KohRongSoon123!@gmail.com', true],
        ['WongYeeJing123!@gmail.com', true],
        ['GervinFungDaXuen123!@gmail.com', true],
    ]).it('when the email taken is %s', (email, expected) => {
        expect(emailTaken(email)).toBe(expected);
    });
});

describe('test email does not exists', () => {
    each([
        ['NoobMaster69@gmail.com', false],
        ['GervinFungDaXuen123@gmail.com', false],
        ['KohRongSoon123@gmail.com', false],
    ]).it("'when the email card is %s", (email, expected) => {
        expect(emailTaken(email)).toBe(expected);
    });
});
