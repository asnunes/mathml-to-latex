import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

export class MTable implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const tableContent = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' \\\\\n');

    // The `innerTable` flag is set by the iterative pre-pass in tree-to-latex.
    return this._hasFlag('innerTable') ? this._wrap(tableContent) : tableContent;
  }

  private _wrap(latex: string): string {
    return `\\begin{matrix}${latex}\\end{matrix}`;
  }

  private _hasFlag(flag: string): boolean {
    return !!this._mathmlElement.attributes[flag];
  }
}
