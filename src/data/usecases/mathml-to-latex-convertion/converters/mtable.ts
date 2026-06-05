import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

/**
 * Converts a MathML `<mtable>` element into LaTeX matrix rows.
 *
 * Each row child is converted and the results are joined with `\\` row
 * separators. When the element carries the `innerTable` flag (set by the
 * tree pre-pass) the rows are additionally wrapped in a `matrix` environment.
 *
 * @example
 * // <mtable><mtr><mtd><mn>1</mn></mtd></mtr></mtable> -> 1
 */
export class MTable implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const tableContent = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' \\\\\n');

    // The `innerTable` flag is set by the iterative pre-pass in tree-to-latex.
    return this._hasFlag('innerTable') ? this._wrap(tableContent) : tableContent;
  }

  /** Wraps the rows in a `matrix` environment. */
  private _wrap(latex: string): string {
    return `\\begin{matrix}${latex}\\end{matrix}`;
  }

  /** Checks whether the given boolean flag attribute is present and truthy. */
  private _hasFlag(flag: string): boolean {
    return !!this._mathmlElement.attributes[flag];
  }
}
