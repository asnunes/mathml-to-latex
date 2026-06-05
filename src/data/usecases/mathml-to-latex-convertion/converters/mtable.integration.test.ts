import { MathMLToLaTeX } from '../../../..';

describe('mtable (integration)', () => {
  it('joins rows with line breaks and cells with ampersands', () => {
    const mathml = `
<math>
  <mtable>
    <mtr>
      <mtd><mn>1</mn></mtd>
      <mtd><mn>2</mn></mtd>
    </mtr>
    <mtr>
      <mtd><mn>3</mn></mtd>
      <mtd><mn>4</mn></mtd>
    </mtr>
  </mtable>
</math>
`;
    expect(MathMLToLaTeX.convert(mathml)).toBe('1 & 2 \\\\ 3 & 4');
  });

  it('wraps a nested mtable in a matrix environment', () => {
    const mathml = `
<math>
  <mtable>
    <mtr>
      <mtd>
        <mtable>
          <mtr><mtd><mn>1</mn></mtd></mtr>
        </mtable>
      </mtd>
    </mtr>
  </mtable>
</math>
`;
    expect(MathMLToLaTeX.convert(mathml)).toBe('\\begin{matrix}1\\end{matrix}');
  });
});
