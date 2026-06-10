import { MathMLToLaTeX } from '../../../../..';

describe('mtext (integration)', () => {
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
    {
      name: 'keep accented text as a single literal run',
      mathml: '<math><mtext>café</mtext></math>',
      latex: '\\text{café}',
    },
    {
      name: 'keep accented words and spaces together',
      mathml: '<math><mtext>São Paulo</mtext></math>',
      latex: '\\text{São Paulo}',
    },
    {
      name: 'escape an underscore so it does not become a subscript',
      mathml: '<math><mtext>a_b</mtext></math>',
      latex: '\\text{a\\_b}',
    },
    {
      name: 'escape braces so they do not group silently',
      mathml: '<math><mtext>{x}</mtext></math>',
      latex: '\\text{\\{x\\}}',
    },
    {
      name: 'escape percent and dollar inside the run',
      mathml: '<math><mtext>preço: R$ 5</mtext></math>',
      latex: '\\text{preço: R\\$ 5}',
    },
    {
      name: 'still delegate known math glyphs to math mode',
      mathml: '<math><mtext>T = 2α</mtext></math>',
      latex: '\\text{T = 2}\\alpha',
    },
  ])('$name', ({ mathml, latex }) => {
    expect(MathMLToLaTeX.convert(mathml)).toBe(latex);
  });
});
