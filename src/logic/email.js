const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const checkEmailValid = (email) => {
    return EMAIL_REGEX.test(email);
};

export const validateEmail = (email) => {
    if (!checkEmailValid(email)) {
        return 'Email is invalid';
    }
    return '';
};
