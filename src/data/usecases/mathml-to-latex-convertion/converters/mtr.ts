import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

/**
 * Converts a MathML `<mtr>` (table row) element into LaTeX.
 *
 * Each cell child is converted and the results are joined with the `&` column
 * separator used inside LaTeX matrix environments. When the row carries the
 * `bareRow` flag (set by the tree pre-pass for rows with no `<mtable>`
 * ancestor) it wraps itself in a `matrix` environment, so the `&` separators
 * never end up outside an environment.
 *
 * @example
 * // <mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr> -> 1 & 2
 */
export class MTr implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const row = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' & ');

    // The `bareRow` flag is set by the iterative pre-pass in tree-to-latex.
    return this._mathmlElement.attributes['bareRow'] ? `\\begin{matrix}${row}\\end{matrix}` : row;
  }
}
