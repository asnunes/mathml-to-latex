import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, ParenthesisWrapper, BracketWrapper } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

/**
 * Converts a MathML `<msup>` element into a LaTeX superscript.
 *
 * Produces `base^{exponent}`. The base is parenthesized when it has more than
 * one child (and is longer than one character); the exponent is always wrapped
 * in braces.
 *
 * @example
 * // <msup><mi>x</mi><mn>2</mn></msup> -> x^{2}
 */
export class MSup implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   * @throws {InvalidNumberOfChildrenError} if the element does not have exactly 2 children.
   */
  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 2) throw new InvalidNumberOfChildrenError(name, 2, childrenLength);

    const baseChild = children[0];
    const exponentChild = children[1];

    return `${this._handleBaseChild(baseChild)}^${this._handleExponentChild(exponentChild)}`;
  }

  /** Converts the base, parenthesizing it when it groups more than one child. */
  private _handleBaseChild(base: MathMLElement): string {
    const baseChildren = base.children;
    const baseStr = mathMLElementToLaTeXConverter(base).convert();

    if (baseChildren.length <= 1) {
      return baseStr;
    }

    return new ParenthesisWrapper().wrapIfMoreThanOneChar(baseStr);
  }

  /** Converts the exponent and wraps it in braces. */
  private _handleExponentChild(exponent: MathMLElement): string {
    const exponentStr = mathMLElementToLaTeXConverter(exponent).convert();

    return new BracketWrapper().wrap(exponentStr);
  }
}
