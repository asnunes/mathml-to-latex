import { MathMLTag } from './MathMLTag';
import { BracketWrapper, ParenthesisWrapper } from '../../../../utils/wrappers';
import { InvalidNumberOfChild } from '../../../../errors';

export class MMultiscripts extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mmultiscripts', value, attributes, children);
  }

  convert(): string {
    if (this._children.length < 3) throw new InvalidNumberOfChild(this.name, 2, this._children.length, 'at least');

    const base = this._children[0];
    const sub = this._children[1];
    const sup = this._children[2];
    const prescript = this._children[3];
    const prescriptSub = this._children[4];
    const prescriptSup = this._children[5];

    const wrappedSub = new BracketWrapper().wrap(sub.convert());
    const wrappedSup = new BracketWrapper().wrap(sup.convert());

    return `${this._wrapInParenthesisIfThereIsSpace(base.convert())}_${wrappedSub}^${wrappedSup}`;
  }

  private _wrapInParenthesisIfThereIsSpace(str: string): string {
    if (!str.match(/\s+/g)) return str;
    return new ParenthesisWrapper().wrap(str);
  }
}
