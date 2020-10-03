import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';
import { GenericWrapper, JoinWithManySeparators } from '../../../helpers';

export class MFenced implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;
  private readonly _open: string;
  private readonly _close: string;
  private readonly _separators: string[];

  constructor(mathmlElement: MathMLElement) {
    this._mathmlElement = mathmlElement;
    this._open = this._mathmlElement.attributes.open || '';
    this._close = this._mathmlElement.attributes.close || '';
    this._separators = Array.from(this._mathmlElement.attributes.separators || '');
  }

  convert(): string {
    const latexChildren = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert());

    if (this._isThereRelativeOfName(this._mathmlElement.children, 'mtable'))
      return new Matrix(this._open, this._close).apply(latexChildren);

    return new Vector(this._open, this._close, this._separators).apply(latexChildren);
  }

  private _isThereRelativeOfName(mathmlElements: MathMLElement[], elementName: string): boolean {
    return mathmlElements.some(
      (child) => child.name === elementName || this._isThereRelativeOfName(child.children, elementName),
    );
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

  apply(latexContents: string[]): string {
    const command = this._command;
    const matrix = `\\begin{${command}}\n${latexContents.join('')}\n\\end{${command}}`;

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
