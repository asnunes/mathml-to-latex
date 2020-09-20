import { MathMLTag } from './MathMLTag';
import { BracketWrapper, ParenthesisWrapper } from '../../../../utils/wrappers';
import { InvalidNumberOfChild } from '../../../../errors';

export class MMultiscripts extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mmultiscripts', value, attributes, children);
  }

  convert(): string {
    if (this._children.length < 3) throw new InvalidNumberOfChild(this.name, 3, this._children.length, 'at least');

    const base = this._children[0];

    return this._prescriptLatex() + this._wrapInParenthesisIfThereIsSpace(base.convert()) + this._postscriptLatex();
  }

  private _prescriptLatex(): string {
    let sub;
    let sup;

    if (this._isPrescripts(this._children[1])) {
      sub = this._children[2];
      sup = this._children[3];
    } else if (this._isPrescripts(this._children[3])) {
      sub = this._children[4];
      sup = this._children[5];
    } else return '';

    const subLatex = sub ? sub.convert() : '';
    const supLatex = sup ? sup.convert() : '';

    return `\\_{${subLatex}}^{${supLatex}}`;
  }

  private _postscriptLatex(): string {
    if (this._isPrescripts(this._children[1])) return '';

    const sub = this._children[1];
    const sup = this._children[2];

    const subLatex = sub ? sub.convert() : '';
    const supLatex = sup ? sup.convert() : '';

    return `_{${subLatex}}^{${supLatex}}`;
  }

  private _wrapInParenthesisIfThereIsSpace(str: string): string {
    if (!str.match(/\s+/g)) return str;
    return new ParenthesisWrapper().wrap(str);
  }

  private _isPrescripts(child: MathMLTag): boolean {
    return child?.name === 'mprescripts';
  }
}
