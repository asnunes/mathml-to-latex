import { normalizeWhiteSpaces } from './normalize-whitespace';

describe('normalizeWhiteSpaces', () => {
  it.each([
    ['collapses runs of spaces', 'a   b', 'a b'],
    ['collapses tabs and newlines', 'a\t\n  b', 'a b'],
    ['leaves single spaces untouched', 'a b c', 'a b c'],
    ['trims nothing, only collapses', '  a  ', ' a '],
    ['handles an empty string', '', ''],
  ])('%s', (_name, input, expected) => {
    expect(normalizeWhiteSpaces(input)).toBe(expected);
  });
});
