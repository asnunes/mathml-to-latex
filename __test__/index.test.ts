import MathMLToLaTeX from '../src';
import * as mathmlStrings from './mocks/mathmlStrings';
import { InvalidNumberOfChildrenError } from '../src/data/errors/invalid-number-of-children';

describe('#convert', () => {
  describe('given math string with mi tag', () => {
    it('converts mi to simple a text', () => {
      const mathml = mathmlStrings.mrootWithMi;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('a');
    });
  });

  describe('given math tag outside any other tag', () => {
    it('converts mi to simple b text', () => {
      const mathml = mathmlStrings.mathWithMi;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('b');
    });
  });

  describe('given math string with mi tag', () => {
    describe('tag with space on it', () => {
      it('should trim empty space', () => {
        const mathml = mathmlStrings.mathWithMiAndSpace;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('a');
      });
    });

    describe('with especial operator', () => {
      it('converts to latex command', () => {
        const mathml = mathmlStrings.miWithEspecialChar;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\infty');
      });
    });

    describe('with empty space', () => {
      it('should keep empty space and convert to mathrm command', () => {
        const mathml = mathmlStrings.emptyMi;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\textrm{ }');
      });
    });
  });

  describe('given math string with mo', () => {
    describe('with simple operator', () => {
      it('converts mo passing its operator as string', () => {
        const mathml = mathmlStrings.moWithSimpleOperator;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('+');
      });
    });

    describe('with Glyph operator', () => {
      it('converts mo passing its operator as LaTeX command', () => {
        const mathml = mathmlStrings.moWithGlyphOperator;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\star');
      });
    });

    describe('with Char operator', () => {
      it('converts mo passing its operator ', () => {
        const mathml = mathmlStrings.moWithCharOperator;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('b');
      });
    });
  });

  describe('given math string with mrow tag', () => {
    it('converts mrow just wrapping its content', () => {
      const mathml = mathmlStrings.mrowWithMnAndMo;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('2 + 2');
    });
  });

  describe('given math string with msqrt tag', () => {
    describe('single mn tag is inside', () => {
      it('converts msqrt wrapping its content inside sqrt LaTeX command', () => {
        const mathml = mathmlStrings.msqrt;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt{2}');
      });
    });

    describe('there are many children inside sqrt tag', () => {
      it('converts msqrt wrapping its content inside sqrt LaTeX command', () => {
        const mathml = mathmlStrings.msqrtWithWrappedContent;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt{2 + 2}');
      });
    });

    describe('sqrt tag has single mrow child', () => {
      it('converts msqrt wrapping its content inside sqrt LaTeX command', () => {
        const mathml = mathmlStrings.msqrtWithMrow;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt{2 + 2}');
      });
    });

    describe('there is no content inside msqrt', () => {
      it('empty sqrt is given', () => {
        const mathml = mathmlStrings.emptyMsqrt;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt{}');
      });
    });
  });

  describe('given mfenced tag', () => {
    describe('when mfenced represents a vector', () => {
      describe('with single content and no attr', () => {
        it('converts mfenced wrapping it content in dots', () => {
          const mathml = mathmlStrings.mfencedWithoutAttribute;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toMatch('\\left(3\\right)');
        });
      });

      describe('with single content and open attribute in bracket char', () => {
        it('converts mfenced wrapping it content between bracket and parenthesis', () => {
          const mathml = mathmlStrings.mfencedWithOpen;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toMatch('\\left{3\\right)');
        });
      });

      describe('with single content and open and closes attributes in parenthesis char', () => {
        it('converts mfenced wrapping it content between parenthesis', () => {
          const mathml = mathmlStrings.mfencedWithOpenAndClose;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toMatch('\\left(3\\right)');
        });
      });

      describe('with single content and open attribute in parenthesis char and close attribute without value', () => {
        it('converts mfenced wrapping it content between bracket and parenthesis', () => {
          const mathml = mathmlStrings.mfencedWithBrokenClose;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toMatch('\\left{3\\right)');
        });
      });

      describe('with more than one content and no attr', () => {
        it('converts mfenced wrapping it content inside parenthesis and joining using commas', () => {
          const mathml = mathmlStrings.mfencedWithWrappedContent;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toMatch('\\left(3,2,1\\right)');
        });
      });

      describe('with four contents with separator attribute as empty string', () => {
        it('converts mfenced wrapping it content inside parentheses and joining using commas', () => {
          const mathml = mathmlStrings.mfencedWithEmptySeparator;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toMatch('\\left(3,2,1,7\\right)');
        });
      });

      describe("with mfenced with three contents with separator attribute ';;;'", () => {
        it("parse mfenced wrapping it content inside parentheses and joining using ';'", () => {
          const mathml = mathmlStrings.mfencedWithSeparator;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toMatch('\\left(3;2;1\\right)');
        });
      });

      describe("with four contents with separator attribute ';.'", () => {
        it("converts mfenced wrapping it content inside parentheses and joining using ';' for the first, '.' for the second and on", () => {
          const mathml = mathmlStrings.mfencedWithDiffSeparators;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toMatch('\\left(3;2.1.7\\right)');
        });
      });
    });

    describe('when mfenced represents a matrix', () => {
      describe('given math string with mtable, mtr and mtd tag', () => {
        describe('with open attribute as [', () => {
          it('returns a bmatrix representation in latex', () => {
            const mathml = mathmlStrings.mfencedAsBmatrix;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{bmatrix}\n x & y \\\\\n z & w \n\\end{bmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('with open attribute as (', () => {
          it('returns a pmatrix representation in latex', () => {
            const mathml = mathmlStrings.mfencedAsPMatrix;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{pmatrix}\n x & y \\\\\n z & w \n\\end{pmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('with open attribute as |', () => {
          it('returns a vmatrix representation in latex', () => {
            const mathml = mathmlStrings.mfencedAsVMatrix;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{vmatrix}\n x & y \\\\\n z & w \n\\end{vmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('with open attribute as {', () => {
          it('returns a Bmatrix representation in latex', () => {
            const mathml = mathmlStrings.mfencedAsBigBMatrix;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{Bmatrix}\n x & y \\\\\n z & w \n\\end{Bmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('with open attribute as ||', () => {
          it('returns a Vmatrix representation in latex', () => {
            const mathml = mathmlStrings.mfencedAsBigVMatrix;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{Vmatrix}\n x & y \\\\\n z & w \n\\end{Vmatrix}'.replace(/\n/g, ''));
          });
        });

        describe('without open attribute', () => {
          it('returns a matrix representation in latex', () => {
            const mathml = mathmlStrings.mfencedAsMatrix;

            const result = MathMLToLaTeX.convert(mathml);

            expect(result).toBe('A = \\begin{bmatrix}\n x & y \\\\\n z & w \n\\end{bmatrix}'.replace(/\n/g, ''));
          });
        });
      });

      describe('given math string with partial function', () => {
        it('returns latex partial function representation', () => {
          const mathml = mathmlStrings.mfencedAsPartialFunction;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toBe(
            `f\\left(x\\right)=\\left{\\begin{matrix}\n x^{2} , x < 0 \\\\ e^{x} , x \\geq 0 \n\\end{matrix}\\right`.replace(
              /\n/g,
              '',
            ),
          );
        });
      });

      describe('given math string with nested mtables', () => {
        it('adds matrix to inner table', () => {
          const mathml = mathmlStrings.mfencedWithNestedMtables;

          const result = MathMLToLaTeX.convert(mathml);

          expect(result).toBe(
            `\\begin{bmatrix} \\begin{matrix}a_{11} & a_{12}\\end{matrix} & \\begin{matrix}\\hdots & \\hdots\\end{matrix} & a_{1 n} \\\\ \\begin{matrix}a_{21} & a_{22}\\end{matrix} & \\begin{matrix}\\ddots & \\end{matrix} & a_{2 n} \\\\ \\begin{matrix}\\begin{matrix}\\vdots & \\vdots\\end{matrix} \\\\ \\begin{matrix}a_{m 1} & a_{m 2}\\end{matrix}\\end{matrix} & \\begin{matrix}\\begin{matrix} & \\ddots\\end{matrix} \\\\ \\begin{matrix}\\hdots & \\hdots\\end{matrix}\\end{matrix} & \\begin{matrix}\\vdots \\\\ a_{m n}\\end{matrix} \\end{bmatrix}`,
          );
        });
      });
    });
  });

  describe('given mfrac tag', () => {
    describe('containing single char contents', () => {
      it('converts mfrac wrap inside \\frac command', () => {
        const mathml = mathmlStrings.mfrac;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\frac{x}{3}');
      });
    });

    describe('containing multiple char contents', () => {
      it('converts mfrac wrap inside \\frac command', () => {
        const mathml = mathmlStrings.mfracWithMrow;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\frac{a + 2}{b - 3}');
      });
    });

    describe('containing two contents with bevelled attribute marked as true', () => {
      it('converts mfrac joining its two char contents with //', () => {
        const mathml = mathmlStrings.shortMFrac;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('1/\\left(x^{3} + 3\\right)');
      });
    });

    describe('containing three children', () => {
      it('throws InvalidNumberOfChildrenError Error', () => {
        const mathml = mathmlStrings.mfracWithThreeChildren;

        const result = () => MathMLToLaTeX.convert(mathml);

        expect(result).toThrow(new InvalidNumberOfChildrenError('mfrac', 2, 3));
      });
    });
  });

  describe('given math string with mroot', () => {
    describe('containing two content', () => {
      it('converts mroot tag wrapping its contents inside \\sqrt command and root parameter', () => {
        const mathml = mathmlStrings.mroot;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\sqrt[3]{x + 2}');
      });
    });

    describe('containing three children', () => {
      it('throws InvalidNumberOfChildrenError', () => {
        const mathml = mathmlStrings.mrootWithThreeChildren;

        const result = () => MathMLToLaTeX.convert(mathml);

        expect(result).toThrow(new InvalidNumberOfChildrenError('mroot', 2, 3));
      });
    });
  });

  describe('given math string with mpadded tag', () => {
    it('converts mpadded just wrapping its content', () => {
      const mathml = mathmlStrings.mpadded;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toMatch('2 + 2');
    });
  });

  describe('given math string with maction tag', () => {
    describe('without any attribute', () => {
      it('converts maction just joining its content separating them by =>', () => {
        const mathml = mathmlStrings.maction;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('a + 2 \\Longrightarrow b - 3');
      });
    });

    describe('with toggle attribute', () => {
      it('converts maction just joining its content separating them by =>', () => {
        const mathml = mathmlStrings.mactionWithMrow;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('a + 2 \\Longrightarrow b - 3');
      });
    });

    describe('with actiontype attribute as toggle', () => {
      it('converts maction just joining its content separating them by =>', () => {
        const mathml = mathmlStrings.mactionTypeToggle;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('a + 2 \\Longrightarrow b - 3');
      });
    });

    describe('with actiontype attribute as statusline', () => {
      it('converts maction just taking the first child', () => {
        const mathml = mathmlStrings.mactionTypeStatusline;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('a + 2');
      });
    });

    describe('with actiontype attribute as tooltip', () => {
      it('converts maction just taking the first child', () => {
        const mathml = mathmlStrings.mactionTypeTooltip;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('a + 2');
      });
    });
  });

  describe('given math string with menclose tag', () => {
    describe('without any attribute', () => {
      it('converts menclose tag just joining its content inside long division latex equivalent commands', () => {
        const mathml = mathmlStrings.menclose;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overline{\\left.\\right)a + 2}');
      });
    });

    describe('with notation attribute as longdiv', () => {
      it('converts menclose tag just joining its content inside long division latex equivalent commands', () => {
        const mathml = mathmlStrings.mencloseNotationLongdiv;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overline{\\left.\\right)a + 2}');
      });
    });

    describe('with notation attribute as actuarial', () => {
      it('converts menclose tag just joining its content inside actuarial latex equivalent commands', () => {
        const mathml = mathmlStrings.mencloseNotationActuarial;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overline{\\left.a + 2\\right|}');
      });
    });

    describe('with notation attribute as actuarial', () => {
      it('converts menclose tag just joining its content inside actuarial latex equivalent commands', () => {
        const mathml = mathmlStrings.mencloseNotationRadical;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\sqrt{a + 2}');
      });
    });

    describe('with notation attribute as box', () => {
      it('converts menclose tag just joining its content inside boxed command', () => {
        const mathml = mathmlStrings.mencloseNotationBox;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\boxed{E = m c^{2}}');
      });
    });

    describe('with notation attribute as roundedbox', () => {
      it('converts menclose tag just joining its content inside boxed command', () => {
        const mathml = mathmlStrings.mencloseNotationRoundedBox;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\boxed{E = m c^{2}}');
      });
    });

    describe('with notation attribute as circle', () => {
      it('converts menclose tag just joining its content inside boxed command', () => {
        const mathml = mathmlStrings.mencloseNotationCircle;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\boxed{E = m c^{2}}');
      });
    });

    describe('with notation attribute as left', () => {
      it('converts menclose tag just joining its content with left bar', () => {
        const mathml = mathmlStrings.mencloseNotationLeft;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\left|E = m c^{2}');
      });
    });

    describe('with notation attribute as right', () => {
      it('converts menclose tag just joining its content with right bar', () => {
        const mathml = mathmlStrings.mencloseNotationRight;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('E = m c^{2}\\right|');
      });
    });

    describe('with notation attribute as top', () => {
      it('converts menclose tag just joining its content with overline command', () => {
        const mathml = mathmlStrings.mencloseNotationTop;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overline{E = m c^{2}}');
      });
    });

    describe('with notation attribute as bottom', () => {
      it('converts menclose tag just joining its content with underline command', () => {
        const mathml = mathmlStrings.mencloseNotationBottom;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underline{a + 2}');
      });
    });

    describe('with notation attribute as updiagonalstrike', () => {
      it('converts menclose tag just joining its content with left bottom to right top cross', () => {
        const mathml = mathmlStrings.mencloseNotationUpdiagnonalstrike;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\cancel{a + 2}');
      });
    });

    describe('with notation attribute as downdiagonalstrike', () => {
      it('converts menclose tag just joining its content with left top to right bottom cross', () => {
        const mathml = mathmlStrings.mencloseNotationDowndiagnonalstrike;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\bcancel{a + 2}');
      });
    });

    describe('with notation attribute as horizontalstrike', () => {
      it('converts menclose tag just joining its content with horizontal cross', () => {
        const mathml = mathmlStrings.mencloseNotationHorizontalstrike;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\hcancel{a + 2}');
      });
    });

    describe('with notation attribute as verticalstrike', () => {
      it('converts menclose tag just joining its content with horizontal cross', () => {
        const mathml = mathmlStrings.mencloseNotationVerticalstike;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\hcancel{a + 2}');
      });
    });

    describe('with notation attribute as updiagonalarrow', () => {
      it('converts menclose tag just joining its content with underline and right bar', () => {
        const mathml = mathmlStrings.mencloseNotationUpdiagnonalarrow;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\cancelto{}{a + 2}');
      });
    });

    describe('with notation attribute as madruwb', () => {
      it('converts menclose tag just joining its content with underline and right bar', () => {
        const mathml = mathmlStrings.mencloseNotationMadruwb;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underline{a + 2\\right|}');
      });
    });

    describe('with notation attribute as phasorangle', () => {
      it('converts menclose tag just joining its content with underline and right bar', () => {
        const mathml = mathmlStrings.mencloseNotationPhasorangle;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('{\\angle \\underline{a + 2}}');
      });
    });
  });

  describe('given math string with merror tag', () => {
    it('converts merror placing its content inside \\color{red}', () => {
      const mathml = mathmlStrings.merror;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\color{red}{2 + 2}');
    });
  });

  describe('given math string with mglyph tag', () => {
    it('ignores it', () => {
      const mathml = mathmlStrings.mglyph;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('');
    });
  });

  describe('given math string with mphantom tag', () => {
    it('replaces every character inside tag by normalized empty space', () => {
      const mathml = mathmlStrings.mphantom;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('x + z');
    });
  });

  describe('given math string with msup tag', () => {
    describe('msup tag contains single char contents', () => {
      it('converts msup joining its two char contents with ^ and wrap exponent in brackets', () => {
        const mathml = mathmlStrings.msup;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('x^{2}');
      });
    });

    describe('msup tag contains base with single char content and exponent with more than one char content', () => {
      it('converts msup joining its two char contents with ^ and wrap exponent in brackets', () => {
        const mathml = mathmlStrings.msupWithMrowOnTop;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('x^{a + b}');
      });
    });

    describe('msup tag contains exponent with single char content and base with more than one char content', () => {
      it('converts msup joining its multi char contents with ^ and wrap base in parenthesis', () => {
        const mathml = mathmlStrings.msupWithMrowOnBottom;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(x + y\\right)^{2}');
      });
    });

    describe('msup tag contains both exponent and base with more than one char content', () => {
      it('converts msup joining its multi char contents with ^, wrap base in parenthesis and exponent in brackets', () => {
        const mathml = mathmlStrings.msupWithMrowOnTopBottom;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(x + y\\right)^{2 + 2}');
      });
    });

    describe('msup tag contains three children', () => {
      it('throws InvalidNumberOfChildrenError', () => {
        const mathml = mathmlStrings.msupWithThreeChildren;

        const result = () => MathMLToLaTeX.convert(mathml);

        expect(result).toThrow(new InvalidNumberOfChildrenError('msup', 2, 3));
      });
    });
  });

  describe('given math string with msub tag', () => {
    describe('msub tag contains single char contents', () => {
      it('converts msub joining its two char contents with _ and wrap subscript in brackets', () => {
        const mathml = mathmlStrings.msub;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('x_{2}');
      });
    });

    describe('msub tag contains base with single char content and subscript with more than one char content', () => {
      it('converts msub joining its two char contents with _ and wrap exponent in brackets', () => {
        const mathml = mathmlStrings.msubWithMrowOnBottom;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('x_{a + b}');
      });
    });

    describe('msub tag contains subscript with single char content and base with more than one char content', () => {
      it('converts msub joining its multi char contents with _ and wrap base in parenthesis', () => {
        const mathml = mathmlStrings.msubWithMrowOnTop;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(x + y\\right)_{2}');
      });
    });

    describe('msub tag contains both base and subscript with more than one char content', () => {
      it('converts msub joining its multi char contents with _, wrap base in parenthesis and subscript in brackets', () => {
        const mathml = mathmlStrings.msubWithMrowOnTopBottom;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toMatch('\\left(x + y\\right)_{2 + 2}');
      });
    });

    describe('msub tag contains three children', () => {
      it('throws InvalidNumberOfChildrenError', () => {
        const mathml = mathmlStrings.msubWithThreeChildren;

        const result = () => MathMLToLaTeX.convert(mathml);

        expect(result).toThrow(new InvalidNumberOfChildrenError('msub', 2, 3));
      });
    });
  });

  describe('given math string with msubsup tag', () => {
    it('join its children using _ and ^ and wrapping in brackets', () => {
      const mathml = mathmlStrings.msubsup;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\int_{0}^{1}');
    });

    it('wraps base inside parentheses when there are empty spaces on it', () => {
      const mathml = mathmlStrings.msubsupWithMrow;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\left(x + y\\right)_{0}^{1}');
    });

    describe('when it have four children', () => {
      it('throws InvalidNumberOfChildrenError', () => {
        const mathml = mathmlStrings.msubsupWithFourChildren;

        const result = () => MathMLToLaTeX.convert(mathml);

        expect(result).toThrow(new InvalidNumberOfChildrenError('msubsup', 3, 4));
      });
    });
  });

  describe('given math string with mtext', () => {
    describe('mtext without any attribute', () => {
      it('wrap its content inside text command', () => {
        const mathml = mathmlStrings.mtext;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\text{ Theorem of Pythagoras }');
      });
    });

    describe('mtext with mathvariant attribute setted as "normal"', () => {
      const mathml = mathmlStrings.mtextNormal;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\text{ Theorem of Pythagoras }');
    });

    describe('mtext with mathvariant attribute setted as "bold"', () => {
      const mathml = mathmlStrings.mtextBold;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\textbf{ Theorem of Pythagoras }');
    });

    describe('mtext with mathvariant attribute setted as "italic"', () => {
      const mathml = mathmlStrings.mtextItalic;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\textit{ Theorem of Pythagoras }');
    });

    describe('mtext with mathvariant attribute setted as "bold-italic"', () => {
      const mathml = mathmlStrings.mtextBoldItalic;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\textbf{\\textit{ Theorem of Pythagoras }}');
    });

    describe('mtext with mathvariant attribute setted as "double-struck"', () => {
      const mathml = mathmlStrings.mtextDoubleStruck;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\mathbb{R}');
    });

    describe('mtext with mathvariant attribute setted as "fraktur"', () => {
      const mathml = mathmlStrings.mtextFraktur;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\mathfrak{Creepy}');
    });

    describe('mtext with mathvariant attribute setted as "bold-fraktur"', () => {
      const mathml = mathmlStrings.mtextBoldFraktur;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\mathfrak{Creepy}');
    });

    describe('mtext with mathvariant attribute setted as "monospace"', () => {
      const mathml = mathmlStrings.mtextMonospace;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\mathtt{simple text}');
    });

    describe('mtext with mathvariant attribute setted as "script"', () => {
      const mathml = mathmlStrings.mtextScript;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\text{Creepy}');
    });

    describe('mtext with mathvariant attribute setted as "bold-script"', () => {
      const mathml = mathmlStrings.mtextBoldScript;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('\\text{Creepy}');
    });
  });

  describe('given math string with mover tag', () => {
    describe('where its first child is a mrow and second is mo containing ⏞', () => {
      it('wrap it content inside overbrace command', () => {
        const mathml = mathmlStrings.mtextMover;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overbrace{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing hat mo as utf-8', () => {
      it('wrap it content inside hat command', () => {
        const mathml = mathmlStrings.moverMrow;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\hat{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing hat mo as encoded', () => {
      it('wrap it content inside hat command', () => {
        const mathml = mathmlStrings.moverEncodedMo;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\hat{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing generic char', () => {
      it('wrap it content inside overset making generic char on top', () => {
        const mathml = mathmlStrings.moverDoubleMrow;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\overset{a + b}{x + y + z}');
      });
    });

    describe('where there are three children', () => {
      it('throws InvalidNumberOfChildrenError', () => {
        const mathml = mathmlStrings.moverThreeChildren;

        const result = () => MathMLToLaTeX.convert(mathml);

        expect(result).toThrowError(new InvalidNumberOfChildrenError('mover', 2, 3));
      });
    });
  });

  describe('given math string with munder tag', () => {
    describe('where its first child is a mrow and second is mo containing ⏟', () => {
      it('wrap it content inside underbrace command', () => {
        const mathml = mathmlStrings.munder;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underbrace{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing generic char', () => {
      it('wrap it content inside underset making generic char on bottom', () => {
        const mathml = mathmlStrings.munderDoubleMrow;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underset{a + b}{x + y + z}');
      });
    });

    describe('where its first child is a mrow and second is mo containing &#x23DE;', () => {
      it('parces wrapping it content inside underbrace command', () => {
        const mathml = mathmlStrings.munderEncodedMrow;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\underbrace{x + y + z}');
      });
    });
  });

  describe('given math string with munderover', () => {
    describe('with three contents', () => {
      it('handles it as it were a subsup tag', () => {
        const mathml = mathmlStrings.munderover;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\int_{0}^{1}');
      });
    });

    describe('with three contents and especial operator', () => {
      it('handles it as it were a subsup tag and convert special operator', () => {
        const mathml = mathmlStrings.munderoverEncoded;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\int_{0}^{\\infty}');
      });
    });

    describe('with munderover with 4 children', () => {
      it('throws InvalidNumberOfChildErrors', () => {
        const mathml = mathmlStrings.munderoverWithThreeChildren;

        const result = () => MathMLToLaTeX.convert(mathml);

        expect(result).toThrow(new InvalidNumberOfChildrenError('munderover', 3, 4));
      });
    });
  });

  describe('given math string with mmultiscript', () => {
    describe('with subscript and superscript only, without preset', () => {
      it('handles it as it were a subsup tag', () => {
        const mathml = mathmlStrings.mmultiscript;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\left(N a\\right)_{11}^{+}');
      });
    });

    describe('with subscript only, without preset', () => {
      it('handles it as it were a subsup tag', () => {
        const mathml = mathmlStrings.mmultiscriptNoSuper;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\left(N a\\right)_{11}^{}');
      });
    });

    describe('with superscript only, without preset', () => {
      it('handles it as it were a subsup tag', () => {
        const mathml = mathmlStrings.mmultiscriptNoSub;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\left(N a\\right)_{}^{+}');
      });
    });

    describe('with subscript and superscript and full preset', () => {
      it('adds prescript to latex subsup expression', () => {
        const mathml = mathmlStrings.mmultiscriptPreset;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\_{b}^{a}X_{d}^{c}');
      });
    });

    describe('with post and preset with empty fields', () => {
      it('adds prescript to latex subsup expression', () => {
        const mathml = mathmlStrings.mmultiscriptPresetWithNone;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\_{b}^{}X_{}^{c}');
      });
    });

    describe('with preset only', () => {
      it('adds prescript and ignore subsup', () => {
        const mathml = mathmlStrings.mmultiscriptPresetOnly;

        const result = MathMLToLaTeX.convert(mathml);

        expect(result).toBe('\\_{b}^{}X');
      });
    });

    describe('with less than 3 children', () => {
      it('throws InvalidNumberOfChildrenError', () => {
        const mathml = mathmlStrings.mmultiscriptWithTwoChildren;

        const result = () => MathMLToLaTeX.convert(mathml);

        expect(result).toThrow(new InvalidNumberOfChildrenError('mmultiscripts', 3, 2, 'at least'));
      });
    });
  });
});
