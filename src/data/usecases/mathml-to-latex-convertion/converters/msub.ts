import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, ParenthesisWrapper, BracketWrapper } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

export class MSub implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 2) throw new InvalidNumberOfChildrenError(name, 2, childrenLength);

    const baseChild = children[0];
    const subscriptChild = children[1];

    return `${this._handleBaseChild(baseChild)}_${this._handleSubscriptChild(subscriptChild)}`;
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
}
