import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, ParenthesisWrapper, BracketWrapper } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

export class MSup implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 2) throw new InvalidNumberOfChildrenError(name, 2, childrenLength);

    const baseChild = children[0];
    const exponentChild = children[1];

    return `${this._handleBaseChild(baseChild)}^${this._handleExponentChild(exponentChild)}`;
  }

  private _handleBaseChild(base: MathMLElement): string {
    const baseChildren = base.children;
    const baseStr = mathMLElementToLaTeXConverter(base).convert();

    if (baseChildren.length <= 1) {
      return baseStr;
    }

    return new ParenthesisWrapper().wrapIfMoreThanOneChar(baseStr);
  }

  private _handleExponentChild(exponent: MathMLElement): string {
    const exponentStr = mathMLElementToLaTeXConverter(exponent).convert();

    return new BracketWrapper().wrap(exponentStr);
  }
}
