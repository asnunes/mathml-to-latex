import { MathMLTag } from './MathMLTag';
import { BracketWrapper, ParenthesisWrapper } from '../../../../wrappers';

export class MSup extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('msup', value, attributes, children);
  }

  convert(): string {
    if (this._children.length !== 2) throw new InvalidNumberOfChild(this._children.length);

    const base = this._children[0].convert();
    const exponent = this._children[1].convert();

    return `${new ParenthesisWrapper().wrapIfMoreThanOneChar(base)}^${new BracketWrapper().wrap(exponent)}`;
  }
}

class InvalidNumberOfChild extends Error {
  constructor(numberOfChild: number) {
    super(`msup tag must have exactly 2 children. It's actually ${numberOfChild}`);
  }
}
