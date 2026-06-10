import { LatexSpecials } from './latex-specials';

describe('LatexSpecials', () => {
  it('escapes the shared specials identically in both modes', () => {
    const input = '#$%&_{}';
    const expected = '\\#\\$\\%\\&\\_\\{\\}';

    expect(LatexSpecials.escapeForMath(input)).toBe(expected);
    expect(LatexSpecials.escapeForText(input)).toBe(expected);
  });

  it('escapes tilde, circumflex and backslash with math-mode commands', () => {
    expect(LatexSpecials.escapeForMath('a~b')).toBe('a\\sim{}b');
    expect(LatexSpecials.escapeForMath('a^b')).toBe('a\\hat{}b');
    expect(LatexSpecials.escapeForMath('a\\b')).toBe('a\\backslash{}b');
  });

  it('escapes tilde, circumflex and backslash with text-mode commands', () => {
    expect(LatexSpecials.escapeForText('a~b')).toBe('a\\textasciitilde{}b');
    expect(LatexSpecials.escapeForText('a^b')).toBe('a\\textasciicircum{}b');
    expect(LatexSpecials.escapeForText('a\\b')).toBe('a\\textbackslash{}b');
  });

  it('leaves non-special characters untouched', () => {
    expect(LatexSpecials.escapeForMath('café α → 42')).toBe('café α → 42');
    expect(LatexSpecials.escapeForText('café α → 42')).toBe('café α → 42');
  });

  it('tells specials apart from ordinary characters', () => {
    expect(LatexSpecials.isSpecial('_')).toBe(true);
    expect(LatexSpecials.isSpecial('\\')).toBe(true);
    expect(LatexSpecials.isSpecial('a')).toBe(false);
    expect(LatexSpecials.isSpecial('é')).toBe(false);
  });
});
