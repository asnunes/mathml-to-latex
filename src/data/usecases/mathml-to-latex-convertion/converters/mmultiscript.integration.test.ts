import { MathMLToLaTeX } from '../../../..';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

describe('mmultiscript (integration)', () => {
  it.each([
    {
      name: 'handles it as it were a subsup tag',
      mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
<mrow>
  <mi>N</mi>
  <mi>a</mi>
</mrow>
<mrow>
  <mn>11</mn>
</mrow>
<mrow>
  <mi>+</mi>
</mrow>
</mmultiscripts>
</math>`,
      latex: '\\left(N a\\right)_{11}^{+}',
    },
    {
      name: 'handles it as it were a subsup tag',
      mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
<mrow>
  <mi>N</mi>
  <mi>a</mi>
</mrow>
<mrow>
  <mn>11</mn>
</mrow>
<none/>
</mmultiscripts>
</math>`,
      latex: '\\left(N a\\right)_{11}^{}',
    },
    {
      name: 'handles it as it were a subsup tag',
      mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
<mrow>
  <mi>N</mi>
  <mi>a</mi>
</mrow>
<none/>
<mrow>
  <mn>+</mn>
</mrow>
</mmultiscripts>
</math>`,
      latex: '\\left(N a\\right)_{}^{+}',
    },
    {
      name: 'adds prescript to latex subsup expression',
      mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>

<mi>X</mi>      <!-- base expression -->  

<mi>d</mi>      <!-- postsubscript -->
<mi>c</mi>      <!-- postsuperscript -->

<mprescripts />
<mi>b</mi>      <!-- presubscript -->
<mi>a</mi>      <!-- presuperscript -->

</mmultiscripts>
</math>`,
      latex: '\\_{b}^{a}X_{d}^{c}',
    },
    {
      name: 'adds prescript to latex subsup expression',
      mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>

<mi>X</mi>      <!-- base expression -->

<none />        <!-- postsubscript -->
<mi>c</mi>      <!-- postsuperscript -->

<mprescripts />
<mi>b</mi>      <!-- presubscript -->
<none />        <!-- presuperscript -->

</mmultiscripts>
</math>`,
      latex: '\\_{b}^{}X_{}^{c}',
    },
    {
      name: 'adds prescript and ignore subsup',
      mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
<mi>X</mi>      <!-- base expression -->
<mprescripts />
<mi>b</mi>      <!-- presubscript -->
<none />        <!-- presuperscript -->

</mmultiscripts>
</math>`,
      latex: '\\_{b}^{}X',
    },
    {
      name: 'should trim empty spaces at the start and end',
      mathml: `
<math xmlns="http://www.w3.org/1998/Math/MathML">
<mi></mi>
<mi>x</mi>
<mi></mi>
<mi></mi>
</math>`,
      latex: 'x',
    },
  ])('$name', ({ mathml, latex }) => {
    expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
  });

  it('throws InvalidNumberOfChildrenError', () => {
    const mathml = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
<mrow>
  <mi>N</mi>
  <mi>a</mi>
</mrow>
<mrow>
  <mn>11</mn>
</mrow>
</mmultiscripts>
</math>`;
    expect(() => MathMLToLaTeX.convert(mathml)).toThrow(
      new InvalidNumberOfChildrenError('mmultiscripts', 3, 2, 'at least'),
    );
  });
});
