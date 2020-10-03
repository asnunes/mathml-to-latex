import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

export class MRoot implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 2) throw new InvalidNumberOfChildrenError(name, 2, childrenLength);

    const content = mathMLElementToLaTeXConverter(children[0]).convert();
    const rootIndex = mathMLElementToLaTeXConverter(children[1]).convert();

    return `\\sqrt[${rootIndex}]{${content}}`;
  }
}
