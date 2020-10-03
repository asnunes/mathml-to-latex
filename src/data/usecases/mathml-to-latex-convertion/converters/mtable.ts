import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

export class MTable implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
    this._addFlagRecursiveIfName(this._mathmlElement.children, 'mtable', 'innerTable');
  }

  convert(): string {
    const tableContent = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' \\\\\n');

    return this._hasFlag('innerTable') ? this._wrap(tableContent) : tableContent;
  }

  private _wrap(latex: string): string {
    return `\\begin{matrix}${latex}\\end{matrix}`;
  }

  private _addFlagRecursiveIfName(mathmlElements: MathMLElement[], name: string, flag: string): void {
    mathmlElements.forEach((mathmlElement) => {
      if (mathmlElement.name === name) mathmlElement.attributes[flag] = flag;
      this._addFlagRecursiveIfName(mathmlElement.children, name, flag);
    });
  }

  private _hasFlag(flag: string): boolean {
    return !!this._mathmlElement.attributes[flag];
  }
}
