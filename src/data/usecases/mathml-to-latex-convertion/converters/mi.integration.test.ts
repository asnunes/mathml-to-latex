import { MathMLToLaTeX } from '../../../..';

describe('mi (integration)', () => {
  it.each([
    { name: 'a single identifier', mathml: '<root><math><mi>a</mi></math></root>', latex: 'a' },
    { name: 'an identifier without a root wrapper', mathml: '<math><mi>b</mi></math>', latex: 'b' },
    {
      name: 'spaced identifiers, honoring the mathvariant',
      mathml: `
<math xmlns="http://www.w3.org/1998/Math/MathML">
<mi mathvariant="normal">Δ</mi>
<mi>x</mi>
</math>`,
      latex: '\\Delta x',
    },
    {
      name: 'a double-struck identifier raised to a power',
      mathml: `
<math>
<msup>
  <mrow>
    <mi mathvariant="double-struck">R</mi>
  </mrow>
  <mrow>
    <mi>n</mi>
  </mrow>
</msup>
</math>
`,
      latex: '\\mathbb{R}^{n}',
    },
    {
      name: 'an identifier with surrounding spaces (trimmed)',
      mathml: '<root><math><mi> a </mi></math></root>',
      latex: 'a',
    },
    {
      name: 'a special character as a LaTeX command',
      mathml: '<root><math><mi> &#x221E; </mi></math></root>',
      latex: '\\infty',
    },
    {
      name: 'a blank identifier as a spaced textrm',
      mathml: '<root><math><mi>  </mi></math></root>',
      latex: '\\textrm{ }',
    },
  ])('converts $name', ({ mathml, latex }) => {
    expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
  });
});
