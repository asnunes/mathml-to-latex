import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';
import { GenericWrapper, JoinWithManySeparators } from '../../../helpers';

export class MFenced implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;
  private readonly open: string;
  private readonly close: string;

  constructor(mathmlElement: MathMLElement) {
    this._mathmlElement = mathmlElement;
    this.open = this._mathmlElement.attributes.open || '';
    this.close = this._mathmlElement.attributes.close || '';
  }

  convert(): string {
    const latexChildren = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert());

    if (this._isThereRelativeOfName(this._mathmlElement.children, 'mtable'))
      return new Matrix(this.open, this.close).apply(latexChildren);

    const separatorsAttr = this._mathmlElement.attributes.separators;
    const hasSeparatorsAttribute = separatorsAttr !== undefined;
    const separatorsArray = separatorsAttr ? Array.from(separatorsAttr) : [];

    // Use comma default only if no separators **attribute** was provided
    const defaultSeparator = !hasSeparatorsAttribute ? ',' : '';
    return new Vector(this.open, this.close, separatorsArray, defaultSeparator).apply(latexChildren);
  }

  private _isThereRelativeOfName(mathmlElements: MathMLElement[], elementName: string): boolean {
    return mathmlElements.some(
      (child) => child.name === elementName || this._isThereRelativeOfName(child.children, elementName),
    );
  }
}

class Vector {
  private readonly open: string;
  private readonly close: string;

  constructor(
    open: string,
    close: string,
    private readonly separators: string[],
    private readonly defaultSeparator: string,
  ) {
    this.open = open || '(';
    this.close = close || ')';
  }

  apply(latexContents: string[]): string {
    const contentWithoutWrapper = JoinWithManySeparators.join(latexContents, this.separators, this.defaultSeparator);
    return new GenericWrapper(this.open, this.close).wrap(contentWithoutWrapper);
  }
}

class Matrix {
  private readonly separators: Separators;
  private readonly _genericCommand = 'matrix';

  constructor(open: string, close: string) {
    this.separators = new Separators(open, close);
  }

  apply(latexContents: string[]): string {
    const command = this._command;
    const matrix = `\\begin{${command}}\n${latexContents.join('')}\n\\end{${command}}`;

    return command === this._genericCommand ? this.separators.wrap(matrix) : matrix;
  }

  private get _command(): string {
    if (this.separators.areParentheses()) return 'pmatrix';
    if (this.separators.areSquareBrackets()) return 'bmatrix';
    if (this.separators.areBrackets()) return 'Bmatrix';
    if (this.separators.areDivides()) return 'vmatrix';
    if (this.separators.areParallels()) return 'Vmatrix';
    if (this.separators.areNotEqual()) return this._genericCommand;
    return 'bmatrix';
  }
}

class Separators {
  constructor(
    private readonly open: string,
    private readonly close: string,
  ) {}

  wrap(str: string): string {
    return new GenericWrapper(this.open, this.close).wrap(str);
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
    return this.open !== this.close;
  }

  private _compare(openToCompare: string, closeToCompare: string): boolean {
    return this.open === openToCompare && this.close === closeToCompare;
  }
}
