import { HashUTF8ToLtXConverter } from './utf8-converter';

describe('HashUTF8ToLtXConverter', () => {
  const converter = new HashUTF8ToLtXConverter();

  it.each([
    ['returns an alphanumeric character as-is', 'a', 'a'],
    ['returns a digit as-is', '7', '7'],
    ['maps an accented vowel to its accent command', 'á', '\\acute{a}'],
    ['maps a tilde vowel to its accent command', 'ã', '\\tilde{a}'],
    ['maps a unicode math-alphanumeric character to its font command', '𝐀', '\\mathbf{A}'],
    ['returns an unmapped symbol unchanged', '+', '+'],
  ])('%s', (_name, input, expected) => {
    expect(converter.convert(input)).toBe(expected);
  });
});
