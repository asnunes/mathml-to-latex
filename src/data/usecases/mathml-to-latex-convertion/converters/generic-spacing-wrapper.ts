import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

export class GenericSpacingWrapper implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    // Check if this is a linear system pattern: { + mtable + empty closing operator
    if (this._isLinearSystemPattern()) {
      return this._convertAsLinearSystem();
    }

    return this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');
  }

  private _isLinearSystemPattern(): boolean {
    const { children } = this._mathmlElement;

    if (children.length !== 3) return false;

    // First child should be opening brace operator
    const firstChild = children[0];
    const isOpeningBrace = firstChild.name === 'mo' && firstChild.value.trim() === '{';

    // Second child should be mtable
    const secondChild = children[1];
    const isMTable = secondChild.name === 'mtable';

    // Third child should be empty closing operator
    const thirdChild = children[2];
    const isEmptyClosing = thirdChild.name === 'mo' && thirdChild.value.trim() === '';

    return isOpeningBrace && isMTable && isEmptyClosing;
  }

  private _convertAsLinearSystem(): string {
    const mtableChild = this._mathmlElement.children[1];
    const tableContent = mtableChild.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' \\\\\n');

    return `\\begin{cases}\n${tableContent}\n\\end{cases}`;
  }
}
