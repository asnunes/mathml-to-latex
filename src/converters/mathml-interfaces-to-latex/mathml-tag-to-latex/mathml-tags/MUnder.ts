import { MathMLTag } from './MathMLTag';
import { InvalidNumberOfChild } from '../../../../errors';
import { latexAccents } from '../../../../syntax/latexAccents';

export class MUnder extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('munder', value, attributes, children);
  }

  convert(): string {
    if (this._children.length !== 2) throw new InvalidNumberOfChild(this._name, 2, this._children.length);

    const content = this._children[0].convert();
    const accent = this._children[1].convert();

    return this._underset(content, accent);
  }

  private _underset(content: string, accent: string): string {
    return latexAccents.includes(accent) ? `${accent}{${content}}` : `\\overset{${accent}}{${content}}`;
  }
}
