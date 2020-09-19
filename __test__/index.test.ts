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

  describe('given math string with mi tag', () => {
    describe('tag with space on it', () => {
      test('should trim empty space', () => {
        const mathml = '<root><math><mi> a </mi></math></root>';

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('a');
      });
    });

    describe('with especial operator', () => {
      test('should convert to latex command', () => {
        const mathml = '<root><math><mi> &#x221E; </mi></math></root>';

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\infty');
      });
    });

    describe('with empty space', () => {
      test('should keep empty space and convert to mathrm command', () => {
        const mathml = '<root><math><mi>  </mi></math></root>';

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\textrm{ }');
      });
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

  describe('given mfenced tag', () => {
    describe('when mfenced represents a vector', () => {
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

    describe('when mfenced represents a matrix', () => {
      describe('given math string with mtable, mtr and mtd tag', () => {
        describe('with open attribute as [', () => {
          it('returns a bmatrix representation in latex', () => {
            const mathml = `
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
            `;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{bmatrix}\n x & y \\\\\n z & w \n\\end{bmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('with open attribute as (', () => {
          it('returns a pmatrix representation in latex', () => {
            const mathml = `
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
            `;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{pmatrix}\n x & y \\\\\n z & w \n\\end{pmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('with open attribute as |', () => {
          it('returns a pmatrix representation in latex', () => {
            const mathml = `
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
            `;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{vmatrix}\n x & y \\\\\n z & w \n\\end{vmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('with open attribute as {', () => {
          it('returns a pmatrix representation in latex', () => {
            const mathml = `
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
            `;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{Bmatrix}\n x & y \\\\\n z & w \n\\end{Bmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('with open attribute as ||', () => {
          it('returns a pmatrix representation in latex', () => {
            const mathml = `
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
            `;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{Vmatrix}\n x & y \\\\\n z & w \n\\end{Vmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('without open attribute', () => {
          it('returns a pmatrix representation in latex', () => {
            const mathml = `
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
            `;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{matrix}\n x & y \\\\\n z & w \n\\end{matrix}'.replace(/\n/g, ''));
          });
        });
      });

      describe('given math string with partial function', () => {
        test('returns latex partial function representation', () => {
          const mathml = `
            <root>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                <mi>f</mi>
                <mfenced separators="|">
                  <mrow>
                    <mi>x</mi>
                  </mrow>
                </mfenced>
                <mo>=</mo>
                <mfenced open="{" close="" separators="|">
                  <mrow>
                    <mtable>
                      <mtr>
                        <mtd>
                          <mrow>
                            <maligngroup></maligngroup>
                            <msup>
                              <mrow>
                                <mi>x</mi>
                              </mrow>
                              <mrow>
                                <mn>2</mn>
                              </mrow>
                            </msup>
                            <mo>,</mo>
                            <mi>x</mi>
                            <mo>&lt;</mo>
                            <mn>0</mn>
                          </mrow>
                        </mtd>
                      </mtr>
                      <mtr>
                        <mtd>
                          <mrow>
                            <maligngroup></maligngroup>
                            <msup>
                              <mrow>
                                <mi>e</mi>
                              </mrow>
                              <mrow>
                                <mi>x</mi>
                              </mrow>
                            </msup>
                            <mo>,</mo>
                            <mi>x</mi>
                            <mo>≥</mo>
                            <mn>0</mn>
                          </mrow>
                        </mtd>
                      </mtr>
                    </mtable>
                  </mrow>
                </mfenced>
              </math>
            </root>
          `;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toBe(
            `f\\left(x\\right)=\\left{\\begin{matrix}\n x^{2} , x < 0 \\\\ e^{x} , x \\geq 0 \n\\end{matrix}\\right`.replace(
              /\n/g,
              '',
            ),
          );
        });
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

  describe('given math string with mroot containing two content', () => {
    test('convert mroot tag wrapping its contents inside \\sqrt command and root parameter', () => {
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

      const result = MathMLToLaTeX.convert(mathml);
      expect(result).toMatch('\\sqrt[3]{x + 2}');
    });
  });

  describe('given math string with mpadded tag', () => {
    test('convert mpadded just wrapping its content', () => {
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

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('2 + 2');
    });
  });

  describe('given math string with maction tag', () => {
    describe('without any attribute', () => {
      test('convert maction just joining its content separating them by =>', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('a + 2 \\Longrightarrow b - 3');
      });
    });

    describe('with toggle attribute', () => {
      test('convert maction just joining its content separating them by =>', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('a + 2 \\Longrightarrow b - 3');
      });
    });

    describe('with actiontype attribute as toggle', () => {
      test('convert maction just joining its content separating them by =>', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('a + 2 \\Longrightarrow b - 3');
      });
    });

    describe('with actiontype attribute as statusline', () => {
      test('convert maction just taking the first child', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('a + 2');
      });
    });

    describe('with actiontype attribute as tooltip', () => {
      test('convert maction just taking the first child', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('a + 2');
      });
    });
  });

  describe('given math string with menclose tag', () => {
    describe('without any attribute', () => {
      test('convert menclose tag just joining its content inside long division latex equivalent commands', () => {
        const mathml = `
          <root>
            <math>
              <menclose>
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overline{\\left.\\right)a + 2}');
      });
    });

    describe('with notation attribute as longdiv', () => {
      test('convert menclose tag just joining its content inside long division latex equivalent commands', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="longdiv">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overline{\\left.\\right)a + 2}');
      });
    });

    describe('with notation attribute as actuarial', () => {
      test('convert menclose tag just joining its content inside actuarial latex equivalent commands', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="actuarial">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overline{\\left.a + 2\\right|}');
      });
    });

    describe('with notation attribute as box', () => {
      test('convert menclose tag just joining its content inside boxed command', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\boxed{E = m c^{2}}');
      });
    });

    describe('with notation attribute as roundedbox', () => {
      test('convert menclose tag just joining its content inside boxed command', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\boxed{E = m c^{2}}');
      });
    });

    describe('with notation attribute as circle', () => {
      test('convert menclose tag just joining its content inside boxed command', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\boxed{E = m c^{2}}');
      });
    });

    describe('with notation attribute as left', () => {
      test('convert menclose tag just joining its content with left bar', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\left|E = m c^{2}');
      });
    });

    describe('with notation attribute as right', () => {
      test('convert menclose tag just joining its content with right bar', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('E = m c^{2}\\right|');
      });
    });

    describe('with notation attribute as top', () => {
      test('convert menclose tag just joining its content with overline command', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overline{E = m c^{2}}');
      });
    });

    describe('with notation attribute as bottom', () => {
      test('convert menclose tag just joining its content with underline command', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="bottom">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underline{a + 2}');
      });
    });

    describe('with notation attribute as updiagonalstrike', () => {
      test('convert menclose tag just joining its content with left bottom to right top cross', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="updiagonalstrike">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\cancel{a + 2}');
      });
    });

    describe('with notation attribute as downdiagonalstrike', () => {
      test('convert menclose tag just joining its content with left top to right bottom cross', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="downdiagonalstrike">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\bcancel{a + 2}');
      });
    });

    describe('with notation attribute as horizontalstrike', () => {
      test('convert menclose tag just joining its content with horizontal cross', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="horizontalstrike">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\hcancel{a + 2}');
      });
    });

    describe('with notation attribute as verticalstrike', () => {
      test('convert menclose tag just joining its content with horizontal cross', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="verticalstrike">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\hcancel{a + 2}');
      });
    });

    describe('with notation attribute as updiagonalarrow', () => {
      test('convert menclose tag just joining its content with underline and right bar', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="updiagonalarrow">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\cancelto{}{a + 2}');
      });
    });

    describe('with notation attribute as madruwb', () => {
      test('convert menclose tag just joining its content with underline and right bar', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="madruwb">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underline{a + 2\\right|}');
      });
    });

    describe('with notation attribute as phasorangle', () => {
      test('convert menclose tag just joining its content with underline and right bar', () => {
        const mathml = `
          <root>
            <math>
              <menclose notation="phasorangle">
                <mi>a</mi>
                <mo>+</mo>
                <mi>2</mi>
              </menclose>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('{\\angle \\underline{a + 2}}');
      });
    });
  });

  describe('given math string with merror tag', () => {
    test('convert merror placing its content inside \\color{red}', () => {
      const mathml = `
        <root>
          <math>
            <merror>
              <mi>2</mi>
              <mo>+</mo>
              <mi>2</mi>
            </merror>
          </math>
        </root>
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\color{red}{2 + 2}');
    });
  });

  describe('given math string with mglyph tag', () => {
    test('ignore it', () => {
      const mathml = `
        <root>
          <math>
            <mi><mglyph src="my-glyph.png" alt="my glyph"/></mi>
          </math>
        </root>
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('');
    });
  });

  describe('given math string with mphantom tag', () => {
    it('replaces every character inside tag by normalized empty space', () => {
      const mathml = `
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
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('x + z');
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

  describe('given math string with msub tag', () => {
    describe('msub tag contains single char contents', () => {
      test('convert msub joining its two char contents with _ and wrap subscript in brackets', () => {
        const mathml = `
          <root>
            <math>
              <msub>
                <mi>x</mi>
                <mn>2</mn>
              </msub>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('x_{2}');
      });
    });

    describe('msub tag contains base with single char content and subscript with more than one char content', () => {
      test('convert msub joining its two char contents with _ and wrap exponent in brackets', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('x_{a + b}');
      });
    });

    describe('msub tag contains subscript with single char content and base with more than one char content', () => {
      test('convert msub joining its multi char contents with _ and wrap base in parenthesis', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(x + y\\right)_{2}');
      });
    });

    describe('msub tag contains both base and subscript with more than one char content', () => {
      test('convert msub joining its multi char contents with _, wrap base in parenthesis and subscript in brackets', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(x + y\\right)_{2 + 2}');
      });
    });
  });

  describe('given math string with msubsup tag', () => {
    it('join its children using _ and ^ and wrapping in brackets', () => {
      const mathml = `
        <root>
          <math>
            <msubsup>
              <mo> &#x222B; </mo>
              <mn> 0 </mn>
              <mn> 1 </mn>
            </msubsup>
          </math>
        </root>
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\int_{0}^{1}');
    });

    it('wraps base inside parentheses when there are empty spaces on it', () => {
      const mathml = `
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
      `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\left(x + y\\right)_{0}^{1}');
    });
  });

  describe('given math string with mtext', () => {
    describe('mtext without any attribute', () => {
      it('wrap its content inside text command', () => {
        const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext> Theorem of Pythagoras </mtext>
          </math>
        </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\text{ Theorem of Pythagoras }');
      });
    });

    describe('mtext with mathvariant attribute setted as "normal"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="normal"> Theorem of Pythagoras </mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\text{ Theorem of Pythagoras }');
    });

    describe('mtext with mathvariant attribute setted as "bold"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="bold"> Theorem of Pythagoras </mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\textbf{ Theorem of Pythagoras }');
    });

    describe('mtext with mathvariant attribute setted as "italic"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="italic"> Theorem of Pythagoras </mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\textit{ Theorem of Pythagoras }');
    });

    describe('mtext with mathvariant attribute setted as "bold-italic"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="bold-italic"> Theorem of Pythagoras </mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\textbf{\\textit{ Theorem of Pythagoras }}');
    });

    describe('mtext with mathvariant attribute setted as "double-struck"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="double-struck">R</mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\mathbb{R}');
    });

    describe('mtext with mathvariant attribute setted as "fraktur"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="fraktur">Creepy</mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\mathfrak{Creepy}');
    });

    describe('mtext with mathvariant attribute setted as "bold-fraktur"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="bold-fraktur">Creepy</mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\mathfrak{Creepy}');
    });

    describe('mtext with mathvariant attribute setted as "monospace"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="monospace">simple text</mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\mathtt{simple text}');
    });

    describe('mtext with mathvariant attribute setted as "script"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="script">Creepy</mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\text{Creepy}');
    });

    describe('mtext with mathvariant attribute setted as "bold-script"', () => {
      const mathml = `
        <root>
          <math xmlns = "http://www.w3.org/1998/Math/MathML">
            <mtext mathvariant="bold-script">Creepy</mtext>
          </math>
        </root>
        `;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\text{Creepy}');
    });
  });

  describe('given math string with mover tag', () => {
    describe('where its first child is a mrow and second is mo containing ⏞', () => {
      test('wrap it content inside overbrace command', () => {
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
                <mo>⏞</mo>
              </mover>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overbrace{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing hat mo as utf-8', () => {
      test('wrap it content inside hat command', () => {
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
                  <mo>^</mo>
                </mover>
              </math>
            </root>
          `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\hat{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing hat mo as encoded', () => {
      test('wrap it content inside hat command', () => {
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
                  <mo>&#x2C6;</mo>
                </mover>
              </math>
            </root>
          `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\hat{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing generic char', () => {
      test('wrap it content inside overset making generic char on top', () => {
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
                <mo>a + b</mo>
              </mover>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overset{a + b}{x + y + z}');
      });
    });
  });

  describe('given math string with munder tag', () => {
    describe('where its first child is a mrow and second is mo containing ⏟', () => {
      test('wrap it content inside underbrace command', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underbrace{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing generic char', () => {
      test('wrap it content inside underset making generic char on bottom', () => {
        const mathml = `
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
                <mo>a + b</mo>
              </munder>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underset{a + b}{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing &#x23DE;', () => {
      test('parce wrapping it content inside underbrace command', () => {
        const mathml = `
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
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underbrace{x + y + z}');
      });
    });
  });

  describe('given math string with munderover', () => {
    describe('with three contents', () => {
      test('handle it as it were an subsup tag', () => {
        const mathml = `
          <root>
            <math>
              <munderover>
                <mo> &#x222B;</mo>
                <mn> 0 </mn>
                <mn> 1 </mn>
              </munderover>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\int_{0}^{1}');
      });
    });

    describe('with three contents and especial operator', () => {
      test('handle it as it were an subsup tag and convert special operator', () => {
        const mathml = `
          <root>
            <math>
              <munderover>
                <mo> &#x222B;</mo>
                <mn> 0 </mn>
                <mi> &#x221E; </mi>
              </munderover>
            </math>
          </root>
        `;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\int_{0}^{\\infty}');
      });
    });
  });
});
