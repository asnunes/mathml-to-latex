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

  describe('given math string with msqrt tag', () => {
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

  describe('given math string with msup tag', () => {
    describe('msup tag contains single char contents', () => {
      test('convert msup joining its two char contents with ^ and wrap exponent in brackets', () => {
        const mathml = `
          <root>
            <math>
              <msup>
                <mi>x</mi>
                <mn>2</mn>
              </msup>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('x^{2}');
      });
    });

    describe('msup tag contains base with single char content and exponent with more than one char content', () => {
      test('convert msup joining its two char contents with ^ and wrap exponent in brackets', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('x^{a + b}');
      });
    });

    describe('msup tag contains exponent with single char content and base with more than one char content', () => {
      test('convert msup joining its multi char contents with ^ and wrap base in parenthesis', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(x + y\\right)^{2}');
      });
    });

    describe('msup tag contains both exponent and base with more than one char content', () => {
      test('convert msup joining its multi char contents with ^, wrap base in parenthesis and exponent in brackets', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(x + y\\right)^{2 + 2}');
      });
    });
  });

  describe('given math string with mfenced with single content and no attr', () => {
    test('convert mfenced wrapping it content in dots', () => {
      const mathml = `
        <root>
          <math>
          <mfenced>
            <mn>3</mn>
          </mfenced>
          </math>
        </root>
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('\\left.3\\right.');
    });
  });

  describe('given math string with mfenced with single content and open attribute in parenthesis char', () => {
    test('convert mfenced wrapping it content between parenthesis and dot', () => {
      const mathml = `
        <root>
          <math>
          <mfenced open="(">
            <mn>3</mn>
          </mfenced>
          </math>
        </root>
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('\\left(3\\right.');
    });
  });

  describe('given math string with mfenced with single content and open and closes attributes in parenthesis char', () => {
    test('convert mfenced wrapping it content between parenthesis', () => {
      const mathml = `
        <root>
          <math>
          <mfenced open="(" close=")">
            <mn>3</mn>
          </mfenced>
          </math>
        </root>
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('\\left(3\\right)');
    });
  });

  describe('given math string with mfenced with single content and open attribute in parenthesis char and close attribute without value', () => {
    test('convert mfenced wrapping it content between parenthesis', () => {
      const mathml = `
        <root>
          <math>
          <mfenced open="(" close>
            <mn>3</mn>
          </mfenced>
          </math>
        </root>
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('\\left(3\\right.');
    });
  });
});
