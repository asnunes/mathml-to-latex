import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../../helpers';
import { LinearSystemPattern } from './linear-system-pattern';

/**
 * Converts a MathML `<mrow>` grouping element into LaTeX.
 *
 * By default it recursively converts every child and joins the results with
 * spaces. As a special case, when the row matches the linear-system pattern
 * (an opening `{` operator and an `<mtable>`, optionally followed by an empty
 * closing operator) it is rendered as a LaTeX `cases` environment.
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
    // Linear system pattern: { + mtable, optionally closed by an empty operator
    if (LinearSystemPattern.matches(this._mathmlElement)) {
      return this._convertAsLinearSystem();
    }

    return this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');
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
