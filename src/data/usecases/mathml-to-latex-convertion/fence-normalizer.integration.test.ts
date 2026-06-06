import { MathMLToLaTeX } from '../../..';

describe('normalize-fences (integration)', () => {
  it.each([
    {
      name: 'bare parentheses collapse to a single stretchy pair',
      mathml: '<math><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo></mrow></math>',
      latex: '\\left(x + y\\right)',
    },
    {
      name: 'bare square brackets',
      mathml: '<math><mrow><mo>[</mo><mi>x</mi><mo>]</mo></mrow></math>',
      latex: '\\left[x\\right]',
    },
    {
      name: 'bare braces (valid escaped delimiters)',
      mathml: '<math><mrow><mo>{</mo><mi>x</mi><mo>}</mo></mrow></math>',
      latex: '\\left\\{x\\right\\}',
    },
    {
      name: 'mixed delimiters (half-open interval)',
      mathml: '<math><mrow><mo>(</mo><mi>a</mi><mo>,</mo><mi>b</mi><mo>]</mo></mrow></math>',
      latex: '\\left(a , b\\right]',
    },
    {
      name: 'nested pairs',
      mathml: '<math><mrow><mo>(</mo><mo>[</mo><mi>a</mi><mo>]</mo><mo>)</mo></mrow></math>',
      latex: '\\left(\\left[a\\right]\\right)',
    },
    {
      name: 'an unmatched opener stays self-balanced',
      mathml: '<math><mrow><mo>(</mo><mi>a</mi></mrow></math>',
      latex: '\\left(\\right. a',
    },
    {
      name: 'bare parentheses around a table become a pmatrix',
      mathml: `
<math>
  <mrow>
    <mo>(</mo>
    <mtable>
      <mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr>
      <mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr>
    </mtable>
    <mo>)</mo>
  </mrow>
</math>
`,
      latex: '\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}',
    },
  ])('converts $name', ({ mathml, latex }) => {
    expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
  });
});
