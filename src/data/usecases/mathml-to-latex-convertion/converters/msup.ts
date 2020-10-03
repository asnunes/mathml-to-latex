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

    const base = mathMLElementToLaTeXConverter(children[0]).convert();
    const exponent = mathMLElementToLaTeXConverter(children[1]).convert();

    return `${new ParenthesisWrapper().wrapIfMoreThanOneChar(base)}^${new BracketWrapper().wrap(exponent)}`;
  }
}
