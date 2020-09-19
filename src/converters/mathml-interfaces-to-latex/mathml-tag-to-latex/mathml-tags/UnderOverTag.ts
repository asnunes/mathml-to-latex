import { MathMLTag } from './MathMLTag';
import { InvalidNumberOfChild } from '../../../../errors';
import { latexAccents } from '../../../../syntax/latexAccents';

export class UnderOverTag extends MathMLTag {
  convert(): string {
    if (this._children.length !== 2) throw new InvalidNumberOfChild(this._name, 2, this._children.length);

    const content = this._children[0].convert();
    const accent = this._children[1].convert();

    return this._applyCommand(content, accent);
  }

  private _applyCommand(content: string, accent: string): string {
    const type = this._name.match(/under/) ? TagTypes.Under : TagTypes.Over;
    return new UnderOverSetter(type).apply(content, accent);
  }
}

class UnderOverSetter {
  private readonly _type;

  constructor(type: TagTypes) {
    this._type = type;
  }

  apply(content: string, accent: string) {
    return latexAccents.includes(accent) ? `${accent}{${content}}` : `${this._defaultCommand}{${accent}}{${content}}`;
  }

  private get _defaultCommand(): string {
    if (this._type === TagTypes.Under) return '\\underset';
    return '\\overset';
  }
}

enum TagTypes {
  Under,
  Over,
}
