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

  describe('given mfenced tag', () => {
    describe('with single content and no attr', () => {
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

        expect(result).toMatch('\\left(3\\right)');
      });
    });

    describe('with single content and open attribute in bracket char', () => {
      test('convert mfenced wrapping it content between bracket and parenthesis', () => {
        const mathml = `
          <root>
            <math>
            <mfenced open="{">
              <mn>3</mn>
            </mfenced>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left{3\\right)');
      });
    });

    describe('with single content and open and closes attributes in parenthesis char', () => {
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

    describe('with single content and open attribute in parenthesis char and close attribute without value', () => {
      test('convert mfenced wrapping it content between bracket and parenthesis', () => {
        const mathml = `
          <root>
            <math>
            <mfenced open="{" close>
              <mn>3</mn>
            </mfenced>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left{3\\right)');
      });
    });

    describe('with more than one content and no attr', () => {
      test('convert mfenced wrapping it content inside parenthesis and joining using commas', () => {
        const mathml = `
          <root>
            <math>
            <mfenced>
              <mn>3</mn>
              <mn>2</mn>
              <mn>1</mn>
            </mfenced>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(3,2,1\\right)');
      });
    });

    describe('with four contents with separator attribute as empty string', () => {
      test('convert mfenced wrapping it content inside parentheses and joining using commas', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(3,2,1,7\\right)');
      });
    });

    describe("with mfenced with three contents with separator attribute ';;;'", () => {
      test("parse mfenced wrapping it content inside parentheses and joining using ';'", () => {
        const mathml = `
          <root>
            <math>
            <mfenced separators=';;;'>
              <mn>3</mn>
              <mn>2</mn>
              <mn>1</mn>
            </mfenced>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(3;2;1\\right)');
      });
    });

    describe("with four contents with separator attribute ';.'", () => {
      test("convert mfenced wrapping it content inside parentheses and joining using ';' for the first, '.' for the second and on", () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(3;2.1.7\\right)');
      });
    });
  });

  describe('given mfrac tag', () => {
    describe('containing single char contents', () => {
      test('convert mfrac wrap inside \\frac command', () => {
        const mathml = `
          <root>
            <math>
              <mfrac>
                <mi>x</mi>
                <mn>3</mn>
              </mfrac>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\frac{x}{3}');
      });
    });
  });

  describe('containing multiple char contents', () => {
    test('convert mfrac wrap inside \\frac command', () => {
      const mathml = `
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
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('\\frac{a + 2}{b - 3}');
    });
  });

  describe('containing two contents with bevelled attribute marked as true', () => {
    test('convert mfrac joining its two char contents with //', () => {
      const mathml = `
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
      `;

      const result = MathMLToLaTeX.convert(mathml);
      expect(result).toMatch('1/\\left(x^{3} + 3\\right)');
    });
  });
});
