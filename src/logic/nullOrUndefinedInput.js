export const checkNullOrUndefined = (input) => input === null || undefined === input;

export const stringIsEmpty = (string) => string.length === 0;

export const validateInput = (input) => !(stringIsEmpty(input) || checkNullOrUndefined(input));
