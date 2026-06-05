import { MathMLToLaTeX } from '../../../..';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

describe('mfrac (integration)', () => {
  it.each([
    {
      name: 'single-char contents',
      mathml: `
<root>
<math>
  <mfrac>
    <mi>x</mi>
    <mn>3</mn>
  </mfrac>
</math>
</root>
`,
      latex: '\\frac{x}{3}',
    },
    {
      name: 'multi-char contents',
      mathml: `
<root>
<math>
  <mfrac>
    <mrow>
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </mrow>
    <mrow>
      <mi>b</mi>
      <mo>-</mo>
      <mi>3</mi>
    </mrow>
  </mfrac>
</math>
</root>
`,
      latex: '\\frac{a + 2}{b - 3}',
    },
    {
      name: 'a bevelled fraction (joined with /)',
      mathml: `
<root>
<math>
  <mfrac bevelled="true">
    <mn>1</mn>
    <mrow>
      <msup>
        <mi>x</mi>
        <mn>3</mn>
      </msup>
      <mo>+</mo>
      <mn>3</mn>
    </mrow>
  </mfrac>
</math>
</root>
`,
      latex: '1/\\left(x^{3} + 3\\right)',
    },
  ])('converts $name', ({ mathml, latex }) => {
    expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
  });

  it('throws when it does not have exactly two children', () => {
    const mathml = `
<root>
<math>
  <mfrac>
    <mi>x</mi>
    <mn>3</mn>
    <mi>2</mi>
  </mfrac>
</math>
</root>
`;
    expect(() => MathMLToLaTeX.convert(mathml)).toThrow(new InvalidNumberOfChildrenError('mfrac', 2, 3));
  });
});
