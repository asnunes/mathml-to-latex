/**
 * Collapses every run of whitespace in the string into a single space.
 *
 * @param str - the string to normalize.
 * @returns the string with runs of whitespace reduced to single spaces.
 */
export const normalizeWhiteSpaces = (str: string): string => {
  return str.replace(/\s+/g, ' ');
};
