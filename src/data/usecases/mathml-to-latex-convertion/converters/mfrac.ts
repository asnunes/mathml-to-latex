import { ToLaTeXConverter } from '@/domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChild } from '../../../errors';
import { ParenthesisWrapper, mathMLElementToLaTeXConverter } from '../../../helpers';

export class MFrac implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { children, name } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 2) throw new InvalidNumberOfChild(name, 2, childrenLength);

    const num = mathMLElementToLaTeXConverter(children[0]).convert();
    const den = mathMLElementToLaTeXConverter(children[1]).convert();

    if (this._isBevelled()) return `${this._wrapIfMoreThanOneChar(num)}/${this._wrapIfMoreThanOneChar(den)}`;

    return `\\frac{${num}}{${den}}`;
  }

  private _wrapIfMoreThanOneChar(str: string): string {
    return new ParenthesisWrapper().wrapIfMoreThanOneChar(str);
  }

  private _isBevelled(): boolean {
    return !!this._mathmlElement.attributes.bevelled;
  }
}
