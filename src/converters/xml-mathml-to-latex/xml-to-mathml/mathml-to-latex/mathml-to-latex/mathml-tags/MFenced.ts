import { MathMLTag } from './MathMLTag';
import { GenericWrapper } from '../../../../../../utils/wrappers';
import { JoinWithManySeparators } from '../../../../../../utils';

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
  private readonly _separators: Separators;
  private readonly _genericCommand = 'matrix';

  constructor(open: string, close: string) {
    this._separators = new Separators(open, close);
  }

  apply(latex: string): string {
    const command = this._command;
    const matrix = `\\begin{${command}}\n${latex}\n\\end{${command}}`;

    return command === this._genericCommand ? this._separators.wrap(matrix) : matrix;
  }

  private get _command(): string {
    if (this._separators.areParentheses()) return 'pmatrix';
    if (this._separators.areSquareBrackets()) return 'bmatrix';
    if (this._separators.areBrackets()) return 'Bmatrix';
    if (this._separators.areDivides()) return 'vmatrix';
    if (this._separators.areParallels()) return 'Vmatrix';
    if (this._separators.areNotEqual()) return this._genericCommand;
    return 'bmatrix';
  }
}

class Separators {
  readonly _open: string;
  readonly _close: string;

  constructor(open: string, close: string) {
    this._open = open;
    this._close = close;
  }

  wrap(str: string): string {
    return new GenericWrapper(this._open, this._close).wrap(str);
  }

  areParentheses(): boolean {
    return this._compare('(', ')');
  }

  areSquareBrackets(): boolean {
    return this._compare('[', ']');
  }

  areBrackets(): boolean {
    return this._compare('{', '}');
  }

  areDivides(): boolean {
    return this._compare('|', '|');
  }

  areParallels(): boolean {
    return this._compare('||', '||');
  }

  areNotEqual(): boolean {
    return this._open !== this._close;
  }

  private _compare(openToCompare: string, closeToCompare: string): boolean {
    return this._open === openToCompare && this._close === closeToCompare;
  }
}
