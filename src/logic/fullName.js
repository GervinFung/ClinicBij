const MIN_LENGTH = 3;

export const checkFullNameMinLength = (fullName) => fullName.length >= MIN_LENGTH;

export const validateFullName = (fullName) => !checkFullNameMinLength(fullName) ? 'Name cannot have less than 3 characters' : '';
