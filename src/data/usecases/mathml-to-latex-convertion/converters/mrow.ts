import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

/**
 * Converts a MathML `<mrow>` grouping element into LaTeX.
 *
 * By default it recursively converts every child and joins the results with
 * spaces. As a special case, when the row matches the linear-system pattern
 * (an opening `{` operator, an `<mtable>`, and an empty closing operator) it is
 * rendered as a LaTeX `cases` environment.
 *
 * @example
 * // <mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow> -> a + b
 * @example
 * // <mrow><mo>{</mo><mtable>...</mtable><mo></mo></mrow> -> \begin{cases} ... \end{cases}
 */
export class MRow implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
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

  /** Detects the `{` + `<mtable>` + empty closing operator shape used for linear systems. */
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

  /** Renders the inner `<mtable>` rows as a LaTeX `cases` environment. */
  private _convertAsLinearSystem(): string {
    const mtableChild = this._mathmlElement.children[1];
    const tableContent = mtableChild.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' \\\\ ');

    return `\\begin{cases} ${tableContent} \\end{cases}`;
  }
}
