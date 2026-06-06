import { latexAccents } from '../../../../../syntax/latex-accents';

/** Applies the accent to the content as a LaTeX accent command, or wraps it with `\underset`/`\overset`. */
export class UnderOverSetter {
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

export enum TagTypes {
  Under,
  Over,
}
