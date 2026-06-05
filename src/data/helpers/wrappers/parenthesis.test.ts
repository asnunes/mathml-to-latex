import { ParenthesisWrapper } from './parenthesis';

describe('ParenthesisWrapper', () => {
  it('wraps a string in auto-sizing parentheses', () => {
    expect(new ParenthesisWrapper().wrap('x + y')).toBe('\\left(x + y\\right)');
  });

  describe('wrapIfMoreThanOneChar', () => {
    it('wraps when longer than one character', () => {
      expect(new ParenthesisWrapper().wrapIfMoreThanOneChar('xy')).toBe('\\left(xy\\right)');
    });

    it.each(['x', ''])('leaves %j untouched when it is at most one character', (value) => {
      expect(new ParenthesisWrapper().wrapIfMoreThanOneChar(value)).toBe(value);
    });
  });
});
