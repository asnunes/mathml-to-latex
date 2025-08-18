import { MathMLElement } from '../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from './mathml-element-to-latex-converter';

export class MatrixPatternDetector {
  private readonly _element: MathMLElement;

  constructor(element: MathMLElement) {
    this._element = element;
  }

  isMatrixPattern(): boolean {
    const { children } = this._element;

    if (children.length !== 3) return false;

    // First child should be opening delimiter (mo)
    const firstChild = children[0];
    const isOpeningDelimiter = firstChild.name === 'mo';

    // Second child should be mtable
    const secondChild = children[1];
    const isMTable = secondChild.name === 'mtable';

    // Third child should be closing delimiter (mo)
    const thirdChild = children[2];
    const isClosingDelimiter = thirdChild.name === 'mo';

    return isOpeningDelimiter && isMTable && isClosingDelimiter;
  }

  convertAsMatrix(): string {
    if (!this.isMatrixPattern()) {
      throw new Error('Not a valid matrix pattern');
    }

    const openDelim = this._element.children[0].value.trim();
    const closeDelim = this._element.children[2].value.trim();
    const mtableChild = this._element.children[1];

    const tableContent = mtableChild.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' \\\\ ');

    const matrixType = this._getMatrixType(openDelim, closeDelim);
    if (matrixType) {
      return `\\begin{${matrixType}} ${tableContent} \\end{${matrixType}}`;
    }

    // Fallback to generic matrix with manual delimiters
    return `\\left${openDelim}\\begin{matrix} ${tableContent} \\end{matrix}\\right${closeDelim}`;
  }

  private _getMatrixType(openDelim: string, closeDelim: string): string | null {
    // Map delimiter pairs to matrix types
    if (openDelim === '(' && closeDelim === ')') return 'pmatrix';
    if (openDelim === '[' && closeDelim === ']') return 'bmatrix';
    if (openDelim === '{' && closeDelim === '}') return 'Bmatrix';
    if (openDelim === '|' && closeDelim === '|') return 'vmatrix';
    if (openDelim === '||' && closeDelim === '||') return 'Vmatrix';
    
    return null;
  }
}