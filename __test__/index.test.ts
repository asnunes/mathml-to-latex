import MathMLToLaTeX from '../src';

describe('#convert', () => {
  describe('given math string with mi tag', () => {
    test('convert mi to simple a text', () => {
      const mathml = '<root><math><mi>a</mi></math></root>';

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('a');
    });
  });

  describe('given math tag outside any other tag', () => {
    test('convert mi to simple b text', () => {
      const mathml = '<math><mi>b</mi></math>';

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('b');
    });
  });

  describe('given math string with mi tag with space on it', () => {
    test('should trim empty space', () => {
      const mathml = '<root><math><mi> a </mi></math></root>';

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('a');
    });
  });

  describe('given math string with mo tag with simple operator', () => {
    test('convert mo passing it operator as string', () => {
      const mathml = `
        <root>
          <math>
            <mo>+</mo>
          </math>
        </root>
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('+');
    });
  });

  describe('given math string with mrow tag', () => {
    test('convert mrow just wrapping its content', () => {
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

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('2 + 2');
    });
  });

  describe('given math string with msqrt', () => {
    describe('single mn tag is inside', () => {
      test('convert msqrt wrapping its content inside sqrt LaTeX command', () => {
        const mathml = `
        <root>
          <math>
            <msqrt>
              <mn>2</mn>
            </msqrt>
          </math>
        </root>
      `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt{2}');
      });
    });

    describe('there are many children inside sqrt tag', () => {
      test('convert msqrt wrapping its content inside sqrt LaTeX command', () => {
        const mathml = `
        <root>
          <math>
            <msqrt>
              <mn>2</mn>
              <mo>+</mo>
              <mn>2</mn>
            </msqrt>
          </math>
        </root>
      `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt{2 + 2}');
      });
    });

    describe('sqrt tag has single mrow child', () => {
      test('convert msqrt wrapping its content inside sqrt LaTeX command', () => {
        const mathml = `
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
      `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt{2 + 2}');
      });
    });

    describe('there is no content inside msqrt', () => {
      test('empty sqrt is given', () => {
        const mathml = `
        <root>
          <math>
            <msqrt>
            </msqrt>
          </math>
        </root>
      `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt{}');
      });
    });
  });
});
