import { GenericWrapper } from './generic';

describe('GenericWrapper', () => {
  it('wraps a string with the given auto-sizing delimiters', () => {
    expect(new GenericWrapper('(', ')').wrap('x + y')).toBe('\\left(x + y\\right)');
  });

  it.each([
    { name: 'opening brace', open: '{', close: '.', latex: '\\left\\{x\\right.' },
    { name: 'closing brace', open: '.', close: '}', latex: '\\left.x\\right\\}' },
    { name: 'both braces', open: '{', close: '}', latex: '\\left\\{x\\right\\}' },
  ])('escapes a $name to a valid LaTeX delimiter (issue #66)', ({ open, close, latex }) => {
    expect(new GenericWrapper(open, close).wrap('x')).toBe(latex);
  });

  it('maps a double bar to the norm delimiter', () => {
    expect(new GenericWrapper('||', '||').wrap('x')).toBe('\\left\\|x\\right\\|');
  });

  it.each([
    { name: 'parallel-to glyph (U+2225)', fence: '∥' },
    { name: 'double vertical line glyph (U+2016)', fence: '‖' },
  ])('maps the $name to the norm delimiter (issue #43)', ({ fence }) => {
    expect(new GenericWrapper(fence, fence).wrap('x')).toBe('\\left\\|x\\right\\|');
  });
});
