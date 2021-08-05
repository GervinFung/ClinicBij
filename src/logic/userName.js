const MIN_LENGTH = 6;

import {userNameTaken} from './tempUserList'

const WHITESPACE_REGEX = /\s/i;

export const checkUsernameMinLength = (userName) => {
    return userName.length >= MIN_LENGTH;
};

export const checkUsernameNoWhitespace = (userName) => {
    return WHITESPACE_REGEX.test(userName);
};

export const validateUsername = (userName) => {
    if (!checkUsernameMinLength(userName)) {
        return 'Username cannot have less than 6 characters';
    } else if (checkUsernameNoWhitespace(userName)) {
        return 'Username cannot have space';
    } else if (userNameTaken(userName)) {
        return 'Username already taken';
    }
    return '';
};