import { MathMLTag } from './MathMLTag';
import { InvalidNumberOfChild } from '../../../../errors';

export class MUnderover extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('munderover', value, attributes, children);
  }

  convert(): string {
    if (this._children.length !== 3) throw new InvalidNumberOfChild(this.name, 3, this._children.length);

    const base = this._children[0].convert();
    const underContent = this._children[1].convert();
    const overContent = this._children[2].convert();

    return `${base}_{${underContent}}^{${overContent}}`;
  }
}
