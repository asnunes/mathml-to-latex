import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

export class MUnderover implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 3) throw new InvalidNumberOfChildrenError(name, 3, childrenLength);

    const base = mathMLElementToLaTeXConverter(children[0]).convert();
    const underContent = mathMLElementToLaTeXConverter(children[1]).convert();
    const overContent = mathMLElementToLaTeXConverter(children[2]).convert();

    return `${base}_{${underContent}}^{${overContent}}`;
  }
}
