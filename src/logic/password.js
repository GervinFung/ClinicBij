const MIN_LENGTH = 6;
const UPPER_CASE_REGEX = /[A-Z]/;
const INTEGER_REGEX = /\d+/i;
const SYMBOL_REGEX = /\W/gmi;

export const checkPasswordMinLength = (password) => password.length >= MIN_LENGTH;

export const checkPasswordContainUpperCase = (password) => UPPER_CASE_REGEX.test(password);

export const checkPasswordContainInteger = (password) => INTEGER_REGEX.test(password);

export const checkPasswordContainSymbol = (password) => SYMBOL_REGEX.test(password);

export const validatePassword = (password) => {
    if (!checkPasswordMinLength(password)) {
        return 'Password cannot have less than 6 characters';
    } else if (!checkPasswordContainUpperCase(password)) {
        return 'Password must contain at least one uppercase';
    } else if (!checkPasswordContainInteger(password)) {
        return 'Password must contain at least one number';
    } else if (!checkPasswordContainSymbol(password)) {
        return 'Password must contain at least one symbol';
    }
    return '';
};
