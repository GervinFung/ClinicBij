const IC_REGEX = /\b[\d]{6}-[\d]{2}-[\d]{4}\b/i;

export const checkIdentityCardValid = (identityCard) => IC_REGEX.test(identityCard);

export const validateIdentityCard = (identityCard) => {
    if (!checkIdentityCardValid(identityCard)) {
        return 'Identity Card is invalid';
    }
    return '';
};
