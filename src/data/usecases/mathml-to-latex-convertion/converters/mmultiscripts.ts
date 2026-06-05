import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, ParenthesisWrapper } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

/**
 * Converts a MathML `<mmultiscripts>` element into LaTeX.
 *
 * Renders the base with attached subscript/superscript pairs, honoring an
 * optional `<mprescripts>` marker to emit pre-scripts before the base.
 *
 * @example
 * // <mmultiscripts><mi>X</mi><mn>1</mn><mn>2</mn></mmultiscripts> -> X_{1}^{2}
 */
export class MMultiscripts implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   * @throws {InvalidNumberOfChildrenError} when fewer than 3 children are present.
   */
  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength < 3) throw new InvalidNumberOfChildrenError(name, 3, childrenLength, 'at least');

    const baseContent = mathMLElementToLaTeXConverter(children[0]).convert();

    return this._prescriptLatex() + this._wrapInParenthesisIfThereIsSpace(baseContent) + this._postscriptLatex();
  }

  /** Builds the pre-script `_{...}^{...}` segment when an `<mprescripts>` marker is present. */
  private _prescriptLatex(): string {
    const { children } = this._mathmlElement;
    let sub;
    let sup;

    if (this._isPrescripts(children[1])) {
      sub = children[2];
      sup = children[3];
    } else if (this._isPrescripts(children[3])) {
      sub = children[4];
      sup = children[5];
    } else return '';

    const subLatex = mathMLElementToLaTeXConverter(sub).convert();
    const supLatex = mathMLElementToLaTeXConverter(sup).convert();

    return `\\_{${subLatex}}^{${supLatex}}`;
  }

  /** Builds the post-script `_{...}^{...}` segment that follows the base. */
  private _postscriptLatex(): string {
    const { children } = this._mathmlElement;
    if (this._isPrescripts(children[1])) return '';

    const sub = children[1];
    const sup = children[2];

    const subLatex = mathMLElementToLaTeXConverter(sub).convert();
    const supLatex = mathMLElementToLaTeXConverter(sup).convert();

    return `_{${subLatex}}^{${supLatex}}`;
  }

  /** Wraps the base in parentheses when it contains whitespace, to keep scripts attached correctly. */
  private _wrapInParenthesisIfThereIsSpace(str: string): string {
    if (!str.match(/\s+/g)) return str;
    return new ParenthesisWrapper().wrap(str);
  }

  /** Returns true when the child is the `<mprescripts>` marker element. */
  private _isPrescripts(child: MathMLElement): boolean {
    return child?.name === 'mprescripts';
  }
}
