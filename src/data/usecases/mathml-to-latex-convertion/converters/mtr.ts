import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

/**
 * Converts a MathML `<mtr>` (table row) element into LaTeX.
 *
 * Each cell child is converted and the results are joined with the `&` column
 * separator used inside LaTeX matrix environments.
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
    return this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' & ');
  }
}
