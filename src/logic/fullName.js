const MIN_LENGTH = 3;

export const checkUsernameMinLength = (fullName) => {
    return fullName.length >= MIN_LENGTH;
};

export const validateFullname = (fullName) => {
    if (!checkUsernameMinLength(fullName)) {
        return 'Username cannot have less than 3 characters';
    }
    return '';
};
