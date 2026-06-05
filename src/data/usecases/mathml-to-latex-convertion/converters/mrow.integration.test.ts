import { MathMLToLaTeX } from '../../../..';

describe('mrow (integration)', () => {
  it('wraps its content', () => {
    const mathml = `
<root>
<math>
  <mrow>
    <mn>2</mn>
    <mo>+</mo>
    <mn>2</mn>
  </mrow>
</math>
</root>
`;
    expect(MathMLToLaTeX.convert(mathml)).toBe('2 + 2');
  });
});
