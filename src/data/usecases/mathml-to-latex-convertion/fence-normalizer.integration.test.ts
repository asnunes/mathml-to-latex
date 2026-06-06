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
      name: 'a matched vertical bar pair (absolute value)',
      mathml: '<math><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></math>',
      latex: '\\left|x\\right|',
    },
    {
      name: 'consecutive bar pairs do not cross',
      mathml: '<math><mrow><mo>|</mo><mi>a</mi><mo>|</mo><mo>+</mo><mo>|</mo><mi>b</mi><mo>|</mo></mrow></math>',
      latex: '\\left|a\\right| + \\left|b\\right|',
    },
    {
      name: 'a bar pair around a table becomes a vmatrix (determinant)',
      mathml: `
<math>
  <mrow>
    <mo>|</mo>
    <mtable>
      <mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr>
      <mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr>
    </mtable>
    <mo>|</mo>
  </mrow>
</math>
`,
      latex: '\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}',
    },
    {
      name: 'an odd vertical bar stays self-balanced',
      mathml: '<math><mrow><mo>(</mo><mi>a</mi><mo>)</mo><mo>|</mo><mi>b</mi></mrow></math>',
      latex: '\\left(a\\right) \\left|\\right. b',
    },
    {
      name: 'double bars are left untouched',
      mathml: '<math><mrow><mo>||</mo><mi>a</mi><mo>||</mo></mrow></math>',
      latex: '\\left||\\right. a \\left||\\right.',
    },
    {
      // A single separator bar (divides, such-that, evaluated-at) never pairs,
      // so it stays exactly as it converts today.
      name: 'a lone separator bar stays untouched',
      mathml: '<math><mrow><mi>a</mi><mo>|</mo><mi>b</mi></mrow></math>',
      latex: 'a \\left|\\right. b',
    },
    {
      // Known limitation: an even count of separator bars in one row is paired
      // positionally (toggle), so such-that-style "x | y | z" gets a bar pair
      // around y. It still renders as bars, matching pre-existing behavior.
      name: 'an even count of separator bars is paired (known limitation)',
      mathml: '<math><mrow><mi>x</mi><mo>|</mo><mi>y</mi><mo>|</mo><mi>z</mi></mrow></math>',
      latex: 'x \\left|y\\right| z',
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
