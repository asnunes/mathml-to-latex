import { LineThickness } from './line-thickness';

describe('LineThickness', () => {
  it.each([undefined, '', 'medium', '1', '1.0', 'unknownvalue', 'not-a-number'])(
    'returns null (default \\frac bar) for %s',
    (raw) => {
      expect(new LineThickness(raw).toLaTeX()).toBeNull();
    },
  );

  it.each(['0', '0pt', '0px', '0.0'])('renders bar-less (0pt) for zero value %s', (raw) => {
    expect(new LineThickness(raw).toLaTeX()).toBe('0pt');
  });

  it.each([
    { raw: '2pt', latex: '2pt' },
    { raw: '0.4mm', latex: '0.4mm' },
    { raw: '2em', latex: '2em' },
    { raw: '1in', latex: '1in' },
  ])('passes absolute length $raw through unchanged', ({ raw, latex }) => {
    expect(new LineThickness(raw).toLaTeX()).toBe(latex);
  });

  it.each([
    { raw: '2', latex: '0.8pt' },
    { raw: '3', latex: '1.2pt' },
  ])('approximates unitless multiplier $raw as points', ({ raw, latex }) => {
    expect(new LineThickness(raw).toLaTeX()).toBe(latex);
  });

  it.each([
    { raw: 'thin', latex: '0.2pt' },
    { raw: 'thick', latex: '0.8pt' },
  ])('approximates the $raw keyword as points', ({ raw, latex }) => {
    expect(new LineThickness(raw).toLaTeX()).toBe(latex);
  });

  it.each([
    { raw: '3px', latex: '2.25pt' },
    { raw: '1px', latex: '0.75pt' },
  ])('converts pixels $raw to points', ({ raw, latex }) => {
    expect(new LineThickness(raw).toLaTeX()).toBe(latex);
  });

  it.each([
    { raw: '50%', latex: '0.2pt' },
    { raw: '100%', latex: '0.4pt' },
  ])('resolves percentage $raw against the default thickness', ({ raw, latex }) => {
    expect(new LineThickness(raw).toLaTeX()).toBe(latex);
  });

  it('trims surrounding whitespace and is case-insensitive', () => {
    expect(new LineThickness('  2PT  ').toLaTeX()).toBe('2pt');
    expect(new LineThickness(' THICK ').toLaTeX()).toBe('0.8pt');
  });
});
