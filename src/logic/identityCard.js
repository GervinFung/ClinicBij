const IC_REGEX = /[\d]{6}\-[\d]{2}\-[\d]{4}/i

export const checkIdentityCardValid = (identityCard) => {
    return IC_REGEX.test(identityCard);
}

export const validateIdentityCard = (identityCard) => {
    if (!checkIdentityCardValid(identityCard)) {
        return 'Identity Card is invalid';
    }
    return '';
};