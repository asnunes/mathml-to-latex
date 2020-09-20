import { MathMLTag } from './MathMLTag';
import { BracketWrapper, ParenthesisWrapper } from '../../../../utils/wrappers';
import { InvalidNumberOfChild } from '../../../../errors';

export class MSup extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('msup', value, attributes, children);
  }

  convert(): string {
    if (this._children.length !== 2) throw new InvalidNumberOfChild(this.name, 2, this._children.length);

    const base = this._children[0].convert();
    const exponent = this._children[1].convert();

    return `${new ParenthesisWrapper().wrapIfMoreThanOneChar(base)}^${new BracketWrapper().wrap(exponent)}`;
  }
}
