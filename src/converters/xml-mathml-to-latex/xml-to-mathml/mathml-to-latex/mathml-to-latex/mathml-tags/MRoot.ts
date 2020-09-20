import { MathMLTag } from './MathMLTag';
import { InvalidNumberOfChild } from '../../../../../../errors';

export class MRoot extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mroot', value, attributes, children);
  }

  convert(): string {
    if (this._children.length !== 2) throw new InvalidNumberOfChild(this.name, 2, this._children.length);

    const content = this._children[0].convert();
    const rootIndex = this._children[1].convert();

    return `\\sqrt[${rootIndex}]{${content}}`;
  }
}
