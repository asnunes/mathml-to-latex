import { MathMLTag } from './MathMLTag';
import { InvalidNumberOfChild } from '../../../../../../errors';
import { ParenthesisWrapper } from '../../../../../../utils/wrappers';

export class MFrac extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mfrac', value, attributes, children);
  }

  convert(): string {
    if (this._children.length !== 2) throw new InvalidNumberOfChild(this.name, 2, this._children.length);

    const num = this._children[0].convert();
    const den = this._children[1].convert();

    if (this._isBevelled) return `${this._wrapIfMoreThanOneChar(num)}/${this._wrapIfMoreThanOneChar(den)}`;

    return `\\frac{${num}}{${den}}`;
  }

  private _wrapIfMoreThanOneChar(str: string): string {
    return new ParenthesisWrapper().wrapIfMoreThanOneChar(str);
  }

  private get _isBevelled(): boolean {
    return !!this._attributes.bevelled;
  }
}
