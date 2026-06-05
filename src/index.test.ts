import { MathMLToLaTeX } from '.';
import * as mathmlStrings from './__fixtures__/mathmlStrings';
import { InvalidNumberOfChildrenError } from './data/errors/invalid-number-of-children';

describe('#convert', () => {
  describe('mi', () => {
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

  describe('mo', () => {
    it.each([
      {
        name: 'a simple operator as a string',
        mathml: `
<root>
  <math>
    <mo>+</mo>
  </math>
</root>
`,
        latex: '+',
      },
      {
        name: 'a divider, preserving it',
        mathml: `
<math>
  <mi>x</mi>
  <mo>=</mo>
  <mn>4</mn>
  <mrow>
    <mo>/</mo>
  </mrow>
  <mn>5</mn>
</math>
`,
        latex: 'x = 4 / 5',
      },
      {
        name: 'a glyph operator as a LaTeX command',
        mathml: `
<root>
  <math>
    <mo>*</mo>
  </math>
</root>
`,
        latex: '\\star',
      },
      {
        name: 'a char operator',
        mathml: `
<root>
  <math>
    <mo>b</mo>
  </math>
</root>
`,
        latex: 'b',
      },
      {
        name: 'a char operator command, spacing it from the next tag',
        mathml: `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mstyle displaystyle="true">
      <mi>a</mi>
      <mo>&#x21D2;</mo>
      <mi>b</mi>
    </mstyle>
  </math>
</root>
`,
        latex: 'a \\Rightarrow b',
      },
    ])('converts $name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('mrow', () => {
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

  describe('msqrt', () => {
    it.each([
      {
        name: 'a single child',
        mathml: `
<root>
  <math>
    <msqrt>
      <mn>2</mn>
    </msqrt>
  </math>
</root>
`,
        latex: '\\sqrt{2}',
      },
      {
        name: 'multiple children',
        mathml: `
<root>
  <math>
    <msqrt>
      <mn>2</mn>
      <mo>+</mo>
      <mn>2</mn>
    </msqrt>
  </math>
</root>
`,
        latex: '\\sqrt{2 + 2}',
      },
      {
        name: 'a single mrow child',
        mathml: `
<root>
  <math>
    <msqrt>
      <mrow>
        <mn>2</mn>
        <mo>+</mo>
        <mn>2</mn>
      </mrow>
    </msqrt>
  </math>
</root>
`,
        latex: '\\sqrt{2 + 2}',
      },
      {
        name: 'no content',
        mathml: `
<root>
  <math>
    <msqrt>
    </msqrt>
  </math>
</root>
`,
        latex: '\\sqrt{}',
      },
    ])('converts $name into a sqrt command', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('mfenced', () => {
    it.each([
      {
        name: 'converts mfenced wrapping it content in dots',
        mathml: `
<root>
  <math>
  <mfenced>
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left(3\\right)',
      },
      {
        name: 'converts mfenced wrapping it content between bracket and parenthesis',
        mathml: `
<root>
  <math>
  <mfenced open="{">
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left{3\\right)',
      },
      {
        name: 'converts mfenced wrapping it content between parenthesis',
        mathml: `
<root>
  <math>
  <mfenced open="(" close=")">
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left(3\\right)',
      },
      {
        name: 'converts mfenced wrapping it content between bracket and parenthesis',
        mathml: `
<root>
  <math>
  <mfenced open="{" close>
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left{3\\right)',
      },
      {
        name: 'converts mfenced wrapping it content inside parenthesis and joining using commas',
        mathml: `
<root>
  <math>
  <mfenced>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left(3,2,1\\right)',
      },
      {
        name: 'converts mfenced wrapping it content inside parentheses and joining using commas',
        mathml: `
<root>
  <math>
  <mfenced>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
    <mn>7</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left(3,2,1,7\\right)',
      },
      {
        name: "parse mfenced wrapping it content inside parentheses and joining using ';'",
        mathml: `
<root>
  <math>
  <mfenced separators=';;;'>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left(3;2;1\\right)',
      },
      {
        name: "converts mfenced wrapping it content inside parentheses and joining using ';' for the first, '.' for the second and on",
        mathml: `
<root>
  <math>
  <mfenced separators=';.'>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
    <mn>7</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left(3;2.1.7\\right)',
      },
      {
        name: 'converts mfenced wrapping it content inside parentheses and joining using empty string',
        mathml: `
<root>
  <math>
  <mfenced separators=''>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
    <mn>7</mn>
  </mfenced>
  </math>
</root>
`,
        latex: '\\left(3217\\right)',
      },
      {
        name: 'should not add comma to pmatrix based on mfenced',
        mathml: `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mfenced open="(" close=")" separators="">
    <mtable>
      <mtr>
        <mtd><msub><mi>x</mi><mn>1</mn></msub></mtd>
        <mtd><mi>A</mi></mtd>
      </mtr>
      <mtr>
        <mtd><msub><mi>x</mi><mn>2</mn></msub></mtd>
        <mtd><mi>B</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>
`,
        latex: '\\begin{pmatrix} x_{1} & A \\\\ x_{2} & B \\end{pmatrix}',
      },
      {
        name: 'should not add comma to linear system based on mfenced',
        mathml: `
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mrow data-mjx-texclass="INNER">
    <mo data-mjx-texclass="OPEN">{</mo>
    <mtable columnalign="left left" columnspacing="1em" rowspacing=".2em">
      <mtr>
        <mtd>
          <mi>x</mi>
          <mo>+</mo>
          <mi>y</mi>
          <mo>=</mo>
          <mn>1</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>x</mi>
          <mo>−</mo>
          <mi>y</mi>
          <mo>=</mo>
          <mn>3</mn>
        </mtd>
      </mtr>
    </mtable>
    <mo data-mjx-texclass="CLOSE" fence="true" stretchy="true" symmetric="true"></mo>
  </mrow>
</math>
`,
        latex: '\\begin{cases} x + y = 1 \\\\ x - y = 3 \\end{cases}',
      },
      {
        name: 'returns a bmatrix representation in latex',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "[" close="]">
        <mtable>
          <mtr>
            <mtd><mi>x</mi></mtd>
            <mtd><mi>y</mi></mtd>
          </mtr>
          <mtr>
            <mtd><mi>z</mi></mtd>
            <mtd><mi>w</mi></mtd>
          </mtr>
        </mtable>
      </mfenced>
    </mrow>
  </math>
</root>
`,
        latex: 'A = \\begin{bmatrix}\n x & y \\\\\n z & w \n\\end{bmatrix}'.replace(/\n/g, ''),
      },
      {
        name: 'returns a pmatrix representation in latex',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "(" close=")">
        <mtable>
          <mtr>
            <mtd><mi>x</mi></mtd>
            <mtd><mi>y</mi></mtd>
          </mtr>
          <mtr>
            <mtd><mi>z</mi></mtd>
            <mtd><mi>w</mi></mtd>
          </mtr>
        </mtable>
      </mfenced>
    </mrow>
  </math>
</root>
`,
        latex: 'A = \\begin{pmatrix}\n x & y \\\\\n z & w \n\\end{pmatrix}'.replace(/\n/g, ''),
      },
      {
        name: 'returns a vmatrix representation in latex',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "|" close="|">
        <mtable>
          <mtr>
            <mtd><mi>x</mi></mtd>
            <mtd><mi>y</mi></mtd>
          </mtr>
          <mtr>
            <mtd><mi>z</mi></mtd>
            <mtd><mi>w</mi></mtd>
          </mtr>
        </mtable>
      </mfenced>
    </mrow>
  </math>
</root>
`,
        latex: 'A = \\begin{vmatrix}\n x & y \\\\\n z & w \n\\end{vmatrix}'.replace(/\n/g, ''),
      },
      {
        name: 'returns a Bmatrix representation in latex',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "{" close="}">
        <mtable>
          <mtr>
            <mtd><mi>x</mi></mtd>
            <mtd><mi>y</mi></mtd>
          </mtr>
          <mtr>
            <mtd><mi>z</mi></mtd>
            <mtd><mi>w</mi></mtd>
          </mtr>
        </mtable>
      </mfenced>
    </mrow>
  </math>
</root>
`,
        latex: 'A = \\begin{Bmatrix}\n x & y \\\\\n z & w \n\\end{Bmatrix}'.replace(/\n/g, ''),
      },
      {
        name: 'returns a Vmatrix representation in latex',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "||" close="||">
        <mtable>
          <mtr>
            <mtd><mi>x</mi></mtd>
            <mtd><mi>y</mi></mtd>
          </mtr>
          <mtr>
            <mtd><mi>z</mi></mtd>
            <mtd><mi>w</mi></mtd>
          </mtr>
        </mtable>
      </mfenced>
    </mrow>
  </math>
</root>
`,
        latex: 'A = \\begin{Vmatrix}\n x & y \\\\\n z & w \n\\end{Vmatrix}'.replace(/\n/g, ''),
      },
      {
        name: 'returns a matrix representation in latex',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced>
        <mtable>
          <mtr>
            <mtd><mi>x</mi></mtd>
            <mtd><mi>y</mi></mtd>
          </mtr>
          <mtr>
            <mtd><mi>z</mi></mtd>
            <mtd><mi>w</mi></mtd>
          </mtr>
        </mtable>
      </mfenced>
    </mrow>
  </math>
</root>
`,
        latex: 'A = \\begin{bmatrix}\n x & y \\\\\n z & w \n\\end{bmatrix}'.replace(/\n/g, ''),
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('mfrac', () => {
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

  describe('mroot', () => {
    it('converts to a sqrt command with a root index', () => {
      const mathml = `
<root>
  <math>
    <mroot>
      <mrow>
        <mi>x</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mn>3</mn>
    </mroot>
  </math>
</root>
`;
      expect(MathMLToLaTeX.convert(mathml)).toBe('\\sqrt[3]{x + 2}');
    });

    it('throws when it does not have exactly two children', () => {
      const mathml = `
<root>
  <math>
    <mroot>
      <mrow>
        <mi>x</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mn>3</mn>
      <mn>2</mn>
    </mroot>
  </math>
</root>
`;
      expect(() => MathMLToLaTeX.convert(mathml)).toThrow(new InvalidNumberOfChildrenError('mroot', 2, 3));
    });
  });

  describe('mpadded', () => {
    it('just wraps its content', () => {
      const mathml = `
<root>
  <math>
    <mpadded>
      <mn>2</mn>
      <mo>+</mo>
      <mn>2</mn>
    </mpadded>
  </math>
</root>
`;
      expect(MathMLToLaTeX.convert(mathml)).toBe('2 + 2');
    });
  });

  describe('maction', () => {
    it.each([
      {
        name: 'converts maction just joining its content separating them by =>',
        mathml: `
<root>
  <math>
    <maction>
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
    </maction>
  </math>
</root>
`,
        latex: 'a + 2 \\Longrightarrow b - 3',
      },
      {
        name: 'converts maction just joining its content separating them by =>',
        mathml: `
<root>
  <math>
    <maction>
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
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>b</mi>
      </mrow>
    </maction>
  </math>
</root>
`,
        latex: 'a + 2 \\Longrightarrow b - 3 \\Longrightarrow a + b',
      },
      {
        name: 'converts maction just joining its content separating them by =>',
        mathml: `
<root>
  <math>
    <maction actiontype="toggle">
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
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>b</mi>
      </mrow>
    </maction>
  </math>
</root>
`,
        latex: 'a + 2 \\Longrightarrow b - 3 \\Longrightarrow a + b',
      },
      {
        name: 'converts maction just taking the first child',
        mathml: `
<root>
  <math>
    <maction actiontype="statusline">
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
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>b</mi>
      </mrow>
    </maction>
  </math>
</root>
`,
        latex: 'a + 2',
      },
      {
        name: 'converts maction just taking the first child',
        mathml: `
<root>
  <math>
    <maction actiontype="tooltip">
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
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>b</mi>
      </mrow>
    </maction>
  </math>
</root>
`,
        latex: 'a + 2',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('menclose', () => {
    it.each([
      {
        name: 'converts menclose tag just joining its content inside long division latex equivalent commands',
        mathml: `
<root>
  <math>
    <menclose>
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\overline{\\left.\\right)a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content inside long division latex equivalent commands',
        mathml: `
<root>
  <math>
    <menclose notation="longdiv">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\overline{\\left.\\right)a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content inside actuarial latex equivalent commands',
        mathml: `
<root>
  <math>
    <menclose notation="actuarial">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\overline{\\left.a + 2\\right|}',
      },
      {
        name: 'converts menclose tag just joining its content inside actuarial latex equivalent commands',
        mathml: `
<root>
  <math>
    <menclose notation="radical">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\sqrt{a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content inside boxed command',
        mathml: `
<root>
  <math>
    <menclose notation="box">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`,
        latex: '\\boxed{E = m c^{2}}',
      },
      {
        name: 'converts menclose tag just joining its content inside boxed command',
        mathml: `
<root>
  <math>
    <menclose notation="roundedbox">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`,
        latex: '\\boxed{E = m c^{2}}',
      },
      {
        name: 'converts menclose tag just joining its content inside boxed command',
        mathml: `
<root>
  <math>
    <menclose notation="circle">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`,
        latex: '\\boxed{E = m c^{2}}',
      },
      {
        name: 'converts menclose tag just joining its content with left bar',
        mathml: `
<root>
  <math>
    <menclose notation="left">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`,
        latex: '\\left|E = m c^{2}',
      },
      {
        name: 'converts menclose tag just joining its content with right bar',
        mathml: `
<root>
  <math>
    <menclose notation="right">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`,
        latex: 'E = m c^{2}\\right|',
      },
      {
        name: 'converts menclose tag just joining its content with overline command',
        mathml: `
<root>
  <math>
    <menclose notation="top">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`,
        latex: '\\overline{E = m c^{2}}',
      },
      {
        name: 'converts menclose tag just joining its content with underline command',
        mathml: `
<root>
  <math>
    <menclose notation="bottom">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\underline{a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content with left bottom to right top cross',
        mathml: `
<root>
  <math>
    <menclose notation="updiagonalstrike">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\cancel{a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content with left top to right bottom cross',
        mathml: `
<root>
  <math>
    <menclose notation="downdiagonalstrike">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\bcancel{a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content with horizontal cross',
        mathml: `
<root>
  <math>
    <menclose notation="horizontalstrike">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\hcancel{a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content with horizontal cross',
        mathml: `
<root>
  <math>
    <menclose notation="verticalstrike">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\hcancel{a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content with underline and right bar',
        mathml: `
<root>
  <math>
    <menclose notation="updiagonalarrow">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\cancelto{}{a + 2}',
      },
      {
        name: 'converts menclose tag just joining its content with underline and right bar',
        mathml: `
<root>
  <math>
    <menclose notation="madruwb">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '\\underline{a + 2\\right|}',
      },
      {
        name: 'converts menclose tag just joining its content with underline and right bar',
        mathml: `
<root>
  <math>
    <menclose notation="phasorangle">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`,
        latex: '{\\angle \\underline{a + 2}}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('merror', () => {
    it.each([
      {
        name: 'converts merror placing its content inside \\\\color{red}',
        mathml: `
<root>
  <math>
    <merror>
      <mi>2</mi>
      <mo>+</mo>
      <mi>2</mi>
    </merror>
  </math>
</root>
`,
        latex: '\\color{red}{2 + 2}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('mglyph', () => {
    it.each([
      {
        name: 'ignores it',
        mathml: `
<root>
  <math>
    <mi><mglyph src="my-glyph.png" alt="my glyph"/></mi>
  </math>
</root>
`,
        latex: '',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('mphantom', () => {
    it.each([
      {
        name: 'replaces every character inside tag by normalized empty space',
        mathml: `
<root>
  <math>
    <mrow>
      <mi> x </mi>
      <mo> + </mo>
      <mphantom>
        <mi> y </mi>
        <mo> + </mo>
      </mphantom>
      <mi> z </mi>
    </mrow>
  </math>
</root>
`,
        latex: 'x + z',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('msup', () => {
    it.each([
      {
        name: 'converts msup joining its two char contents with ^ and wrap exponent in brackets',
        mathml: `
<root>
  <math>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
    </msup>
  </math>
</root>
`,
        latex: 'x^{2}',
      },
      {
        name: 'converts msup joining its two char contents with ^ and wrap exponent in brackets',
        mathml: `
<root>
  <math>
    <msup>
      <mi>x</mi>
      <mrow>
        <mn>a</mn>
        <mo>+</mo>
        <mn>b</mn>
      </mrow>
    </msup>
  </math>
</root>
`,
        latex: 'x^{a + b}',
      },
      {
        name: 'converts msup joining its multi char contents with ^ and wrap base in parenthesis',
        mathml: `
<root>
  <math>
    <msup>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mi>2</mi>
    </msup>
  </math>
</root>
`,
        latex: '\\left(x + y\\right)^{2}',
      },
      {
        name: 'converts msup joining its multi char contents with ^, wrap base in parenthesis and exponent in brackets',
        mathml: `
<root>
  <math>
    <msup>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mrow>
        <mn>2</mn>
        <mo>+</mo>
        <mn>2</mn>
      </mrow>
    </msup>
  </math>
</root>
`,
        latex: '\\left(x + y\\right)^{2 + 2}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });

    it('throws InvalidNumberOfChildrenError', () => {
      const mathml = `
<root>
  <math>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
      <mn>3</mn>
    </msup>
  </math>
</root>
`;
      expect(() => MathMLToLaTeX.convert(mathml)).toThrow(new InvalidNumberOfChildrenError('msup', 2, 3));
    });
  });

  describe('msub', () => {
    it.each([
      {
        name: 'converts msub joining its two char contents with _ and wrap subscript in brackets',
        mathml: `
<root>
  <math>
    <msub>
      <mi>x</mi>
      <mn>2</mn>
    </msub>
  </math>
</root>
`,
        latex: 'x_{2}',
      },
      {
        name: 'converts msub joining its two char contents with _ and wrap exponent in brackets',
        mathml: `
<root>
  <math>
    <msub>
      <mi>x</mi>
      <mrow>
        <mn>a</mn>
        <mo>+</mo>
        <mn>b</mn>
      </mrow>
    </msub>
  </math>
</root>
`,
        latex: 'x_{a + b}',
      },
      {
        name: 'converts msub joining its multi char contents with _ and wrap base in parenthesis',
        mathml: `
<root>
  <math>
    <msub>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mi>2</mi>
    </msub>
  </math>
</root>
`,
        latex: '\\left(x + y\\right)_{2}',
      },
      {
        name: 'converts msub joining its multi char contents with _, wrap base in parenthesis and subscript in brackets',
        mathml: `
<root>
  <math>
    <msub>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mrow>
        <mn>2</mn>
        <mo>+</mo>
        <mn>2</mn>
      </mrow>
    </msub>
  </math>
</root>
`,
        latex: '\\left(x + y\\right)_{2 + 2}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });

    it('throws InvalidNumberOfChildrenError', () => {
      const mathml = `
<root>
  <math>
    <msub>
      <mi>x</mi>
      <mn>2</mn>
      <mn>3</mn>
    </msub>
  </math>
</root>
`;
      expect(() => MathMLToLaTeX.convert(mathml)).toThrow(new InvalidNumberOfChildrenError('msub', 2, 3));
    });
  });

  describe('msubsup', () => {
    it.each([
      {
        name: 'join its children using _ and ^ and wrapping in brackets',
        mathml: `
<root>
  <math>
    <msubsup>
      <mo> &#x222B; </mo>
      <mn> 0 </mn>
      <mn> 1 </mn>
    </msubsup>
  </math>
</root>
`,
        latex: '\\int_{0}^{1}',
      },
      {
        name: 'wraps base inside parentheses when there are empty spaces on it',
        mathml: `
<root>
  <math>
    <msubsup>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mn> 0 </mn>
      <mn> 1 </mn>
    </msubsup>
  </math>
</root>
`,
        latex: '\\left(x + y\\right)_{0}^{1}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });

    it('throws InvalidNumberOfChildrenError', () => {
      const mathml = `
<root>
  <math>
    <msubsup>
      <mo> &#x222B; </mo>
      <mn> 0 </mn>
      <mn> 1 </mn>
      <mn> 5 </mn>
    </msubsup>
  </math>
</root>
`;
      expect(() => MathMLToLaTeX.convert(mathml)).toThrow(new InvalidNumberOfChildrenError('msubsup', 3, 4));
    });
  });

  describe('mtext', () => {
    it.each([
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext> Theorem of Pythagoras </mtext>
  </math>
</root>
`,
        latex: '\\text{ Theorem of Pythagoras }',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="normal"> Theorem of Pythagoras </mtext>
  </math>
</root>
`,
        latex: '\\text{ Theorem of Pythagoras }',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="bold"> Theorem of Pythagoras </mtext>
  </math>
</root>
`,
        latex: '\\textbf{ Theorem of Pythagoras }',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="italic"> Theorem of Pythagoras </mtext>
  </math>
</root>
`,
        latex: '\\textit{ Theorem of Pythagoras }',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="bold-italic"> Theorem of Pythagoras </mtext>
  </math>
</root>
`,
        latex: '\\textbf{\\textit{ Theorem of Pythagoras }}',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="double-struck">R</mtext>
  </math>
</root>
`,
        latex: '\\mathbb{R}',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="fraktur">Creepy</mtext>
  </math>
</root>
`,
        latex: '\\mathfrak{Creepy}',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="bold-fraktur">Creepy</mtext>
  </math>
</root>
`,
        latex: '\\mathfrak{Creepy}',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="monospace">simple text</mtext>
  </math>
</root>
`,
        latex: '\\mathtt{simple text}',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="script">Creepy</mtext>
  </math>
</root>
`,
        latex: '\\text{Creepy}',
      },
      {
        name: 'wrap its content inside text command',
        mathml: `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="bold-script">Creepy</mtext>
  </math>
</root>
`,
        latex: '\\text{Creepy}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('mover', () => {
    it.each([
      {
        name: 'wrap it content inside overbrace command',
        mathml: `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>⏞</mo>
    </mover>
  </math>
</root>
`,
        latex: '\\overbrace{x + y + z}',
      },
      {
        name: 'wrap it content inside hat command',
        mathml: `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>^</mo>
    </mover>
  </math>
</root>
`,
        latex: '\\hat{x + y + z}',
      },
      {
        name: 'wrap it content inside hat command',
        mathml: `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>&#x2C6;</mo>
    </mover>
  </math>
</root>
`,
        latex: '\\hat{x + y + z}',
      },
      {
        name: 'wrap it content inside overset making generic char on top',
        mathml: `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mrow>
        <mi> a </mi>
        <mo> + </mo>
        <mi> b </mi>
      </mrow>
    </mover>
  </math>
</root>
`,
        latex: '\\overset{a + b}{x + y + z}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });

    it('throws InvalidNumberOfChildrenError', () => {
      const mathml = `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo> + </mo>
      <mi> z </mi>
    </mover>
  </math>
</root>
`;
      expect(() => MathMLToLaTeX.convert(mathml)).toThrow(new InvalidNumberOfChildrenError('mover', 2, 3));
    });
  });

  describe('munder', () => {
    it.each([
      {
        name: 'wrap it content inside underbrace command',
        mathml: `
<root>
  <math>
    <munder accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>⏟</mo>
    </munder>
  </math>
</root>
`,
        latex: '\\underbrace{x + y + z}',
      },
      {
        name: 'wrap it content inside underset making generic char on bottom',
        mathml: `
<root>
  <math>
    <munder accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mrow>
        <mi> a </mi>
        <mo> + </mo>
        <mi> b </mi>
      </mrow>
    </munder>
  </math>
</root>
`,
        latex: '\\underset{a + b}{x + y + z}',
      },
      {
        name: 'parces wrapping it content inside underbrace command',
        mathml: `
<root>
  <math>
    <munder accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>&#x23DF;</mo>
    </munder>
  </math>
</root>
`,
        latex: '\\underbrace{x + y + z}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('munderover', () => {
    it.each([
      {
        name: 'handles it as it were a subsup tag',
        mathml: `
<root>
  <math>
    <munderover>
      <mo> &#x222B;</mo>
      <mn> 0 </mn>
      <mn> 1 </mn>
    </munderover>
  </math>
</root>
`,
        latex: '\\int_{0}^{1}',
      },
      {
        name: 'handles it as it were a subsup tag and convert special operator',
        mathml: `
<root>
  <math>
    <munderover>
      <mo> &#x222B;</mo>
      <mn> 0 </mn>
      <mi> &#x221E; </mi>
    </munderover>
  </math>
</root>
`,
        latex: '\\int_{0}^{\\infty}',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });

    it('throws InvalidNumberOfChildErrors', () => {
      const mathml = `
<root>
  <math>
    <munderover>
      <mo> &#x222B;</mo>
      <mn> 0 </mn>
      <mi> &#x221E; </mi>
      <mi> 1 </mi>
    </munderover>
  </math>
</root>
`;
      expect(() => MathMLToLaTeX.convert(mathml)).toThrow(new InvalidNumberOfChildrenError('munderover', 3, 4));
    });
  });

  describe('mmultiscript', () => {
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

  describe('mspace', () => {
    it.each([
      {
        name: 'should convert mspace with linebreak="newline" to LaTeX line break',
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
        <mfrac><mn>1</mn><mn>2</mn></mfrac>
        <mspace linebreak="newline"/>
        <msqrt><mn>10</mn></msqrt>
      </math>`,
        latex: '\\frac{1}{2} \\\\ \\sqrt{10}',
      },
      {
        name: 'should convert mspace without linebreak attribute to regular space',
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
        <mi>a</mi>
        <mspace/>
        <mi>b</mi>
      </math>`,
        latex: 'a b',
      },
    ])('$name', ({ mathml, latex }) => {
      expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
    });
  });

  describe('long char and glyph convertion', () => {
    it('should convert ϵ properly to \\epsilon', () => {
      const mathml = mathmlStrings.mathWithEpsilonGlyph;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('d = \\left(\\frac{q^{2} L}{2 \\pi \\epsilon_{0} m g}\\right)^{1 / 3}');
    });

    it('should convert µ properly to \\mu', () => {
      const mathml = mathmlStrings.mathWithMuGlyph;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('2 \\mu s');
    });

    it('should convert ⋅ properly to \\cdot on text', () => {
      const mathml = mathmlStrings.mathWithCdotGlyph;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\text{kg}\\cdot\\text{m}^{2}');
    });

    it('should convert alternative ı to \\imath', () => {
      const mathml = mathmlStrings.mathWithAlternative1;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('E \\left(W_{\\imath}\\right) = \\mu');
    });

    it('should convert alternative square to \\blacksquare', () => {
      const mathml = mathmlStrings.mathWithAlternativeSquare;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('2 \\blacksquare s');
    });

    for (const inputExpectedPair of mathmlStrings.inputExpectedPairs) {
      const { input, expected, op } = inputExpectedPair;

      it(`should convert ${input} to ${expected} for tag ${op}`, () => {
        const mathml = `<math xmlns="http://www.w3.org/1998/Math/MathML"><${op}>${input}</${op}></math>`;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe(expected);
      });
    }
  });

  it('should remove ms word prefixes and convert tags as expected', () => {
    const result = MathMLToLaTeX.convert(mathmlStrings.msWordInput);

    expect(result).toBe(
      'V_{i} \\frac{\\Delta C_{A , i}^{t}}{\\Delta t} = \\sum_{j = k}^{N} G_{i , j}^{D} \\left(C_{A , j} - C_{A , i}\\right)',
    );
  });

  it('should convert MathML without unnecessary delimiters and handle mtext spacing correctly', () => {
    const mathml = `
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <semantics>
        <mrow>
          <msub>
            <mtext>Required Value</mtext>
            <mtext>other</mtext>
          </msub>
          <mo>≥</mo>
          <mfrac>
            <mrow>
              <mn>21</mn>
              <mi>f</mi>
              <msup>
                <mi>t</mi>
                <mn>3</mn>
              </msup>
            </mrow>
            <mrow>
              <mi>A</mi>
              <mi>C</mi>
              <mi>H</mi>
            </mrow>
          </mfrac>
          <mo>⋅</mo>
          <mo fence="true">(</mo>
          <mfrac>
            <msub>
              <mi>I</mi>
              <mi>o</mi>
            </msub>
            <mrow>
              <mn>1000</mn>
              <msub>
                <mi>B</mi>
                <mrow>
                  <mtext>Btu</mtext>
                  <mi mathvariant="normal">/</mi>
                  <mtext>h</mtext>
                </mrow>
              </msub>
            </mrow>
          </mfrac>
          <mo fence="true">)</mo>
        </mrow>
      </semantics>
    </math>
    `;

    const expectedLatex = `\\text{Required Value}_{\\text{other}} \\geq \\frac{21 f t^{3}}{A C H} \\cdot \\left(\\right. \\frac{I_{o}}{1000 B_{\\text{Btu} / \\text{h}}} \\left.\\right)`;

    const result = MathMLToLaTeX.convert(mathml);

    expect(result).toBe(expectedLatex);
  });

  it('should correctly convert mmultiscripts with empty mprescripts', () => {
    const mathml = `
      <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mmultiscripts>
          <mi mathvariant="normal">U</mi>
          <mprescripts></mprescripts>
          <mn>238</mn>
        </mmultiscripts>
      </math>
    `;

    const result = MathMLToLaTeX.convert(mathml);

    expect(result).toBe('\\_{238}^{}U');
  });
});
