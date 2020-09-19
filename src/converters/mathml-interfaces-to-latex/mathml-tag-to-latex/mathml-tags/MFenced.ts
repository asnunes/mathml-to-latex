import { MathMLTag } from './MathMLTag';
import { GenericWrapper } from '../../../../utils/wrappers';
import { JoinWithManySeparators } from '../../../../utils';

export class MFenced extends MathMLTag {
  private readonly _open: string;
  private readonly _close: string;
  private readonly _separators: string[];

  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mfenced', value, attributes, children);

    this._open = this._attributes.open || '';
    this._close = this._attributes.close || '';
    this._separators = Array.from(this._attributes.separators || '');
  }

  convert(): string {
    if (this.isThere('MTable')) return new Matrix(this._open, this._close).apply(this._mapChildrenToLaTeX().join());

    return new Vector(this._open, this._close, this._separators).apply(this._mapChildrenToLaTeX());
  }
}

class Vector {
  private readonly _open: string;
  private readonly _close: string;
  private readonly _separators: string[];

  constructor(open: string, close: string, separators: string[]) {
    this._open = open || '(';
    this._close = close || ')';
    this._separators = separators;
  }

  apply(latexContents: string[]): string {
    const contentWithoutWrapper = JoinWithManySeparators.join(latexContents, this._separators);

    return new GenericWrapper(this._open, this._close).wrap(contentWithoutWrapper);
  }
}

class Matrix {
  private readonly _open: string;
  private readonly _close: string;
  private readonly _genericCommand = 'matrix';

  constructor(open: string, close: string) {
    this._open = open;
    this._close = close;
  }

  apply(latex: string): string {
    if (this._close || !this._open)
      return `\\begin{${this._customCommand}}\n` + latex + `\n\\end{${this._customCommand}}`;

    const matrix = `\\begin{${this._genericCommand}}\n` + latex + `\n\\end{${this._genericCommand}}`;
    return new GenericWrapper(this._open, this._close).wrap(matrix);
  }

  private get _customCommand(): string {
    switch (this._open) {
      case '(':
        return 'pmatrix';
      case '|':
        return 'vmatrix';
      case '||':
        return 'Vmatrix';
      case '[':
        return 'bmatrix';
      case '{':
        return 'Bmatrix';
      default:
        return this._genericCommand;
    }
  }
}
