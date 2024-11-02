import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, ParenthesisWrapper, BracketWrapper } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

export class MSubsup implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 3) throw new InvalidNumberOfChildrenError(name, 3, childrenLength);

    const baseChild = children[0];
    const subscriptChild = children[1];
    const superscriptChild = children[2];

    return `${this._handleBaseChild(baseChild)}_${this._handleSubscriptChild(subscriptChild)}^${this._handleSuperscriptChild(superscriptChild)}`;
  }

  private _handleBaseChild(base: MathMLElement): string {
    const baseChildren = base.children;
    const baseStr = mathMLElementToLaTeXConverter(base).convert();

    if (baseChildren.length <= 1) {
      return baseStr;
    }

    return new ParenthesisWrapper().wrapIfMoreThanOneChar(baseStr);
  }

  private _handleSubscriptChild(subscript: MathMLElement): string {
    const subscriptStr = mathMLElementToLaTeXConverter(subscript).convert();

    return new BracketWrapper().wrap(subscriptStr);
  }

  private _handleSuperscriptChild(superscript: MathMLElement): string {
    const superscriptStr = mathMLElementToLaTeXConverter(superscript).convert();

    return new BracketWrapper().wrap(superscriptStr);
  }
}
