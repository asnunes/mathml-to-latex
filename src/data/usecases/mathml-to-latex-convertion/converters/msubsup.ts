import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, ParenthesisWrapper, BracketWrapper } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

/**
 * Converts a MathML `<msubsup>` element into a combined LaTeX subscript and superscript.
 *
 * Produces `base_{subscript}^{superscript}`. The base is parenthesized when it
 * has more than one child (and is longer than one character); both the subscript
 * and superscript are always wrapped in braces.
 *
 * @example
 * // <msubsup><mi>x</mi><mn>1</mn><mn>2</mn></msubsup> -> x_{1}^{2}
 */
export class MSubsup implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   * @throws {InvalidNumberOfChildrenError} if the element does not have exactly 3 children.
   */
  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 3) throw new InvalidNumberOfChildrenError(name, 3, childrenLength);

    const baseChild = children[0];
    const subscriptChild = children[1];
    const superscriptChild = children[2];

    return `${this._handleBaseChild(baseChild)}_${this._handleSubscriptChild(subscriptChild)}^${this._handleSuperscriptChild(superscriptChild)}`;
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

  /** Converts the subscript and wraps it in braces. */
  private _handleSubscriptChild(subscript: MathMLElement): string {
    const subscriptStr = mathMLElementToLaTeXConverter(subscript).convert();

    return new BracketWrapper().wrap(subscriptStr);
  }

  /** Converts the superscript and wraps it in braces. */
  private _handleSuperscriptChild(superscript: MathMLElement): string {
    const superscriptStr = mathMLElementToLaTeXConverter(superscript).convert();

    return new BracketWrapper().wrap(superscriptStr);
  }
}
