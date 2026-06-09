import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../../helpers';
import { EquationAlignment } from './equation-alignment';

/**
 * Converts a MathML `<mtable>` element into LaTeX matrix rows.
 *
 * Each row child is converted and the results are joined with `\\` row
 * separators. Flags set by the tree pre-pass control the wrapper: `innerTable`
 * (table nested in another table) wraps the rows in a `matrix` environment, and
 * `bareTable` (table that no other converter wraps) wraps them in `matrix`, or
 * in `aligned` when {@link EquationAlignment} recognizes the input tree as
 * multiline equation alignment, so `&`/`\\` never end up outside an environment.
 *
 * @example
 * // <mtable><mtr><mtd><mn>1</mn></mtd></mtr></mtable> -> \begin{matrix}1\end{matrix}
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

    // Both flags are set by the iterative pre-pass in tree-to-latex.
    if (this._hasFlag('innerTable')) return this._wrap(tableContent, 'matrix');
    if (this._hasFlag('bareTable')) {
      return this._wrap(tableContent, EquationAlignment.matches(this._mathmlElement) ? 'aligned' : 'matrix');
    }

    return tableContent;
  }

  /** Wraps the rows in the given LaTeX environment. */
  private _wrap(latex: string, environment: string): string {
    return `\\begin{${environment}}${latex}\\end{${environment}}`;
  }

  /** Checks whether the given boolean flag attribute is present and truthy. */
  private _hasFlag(flag: string): boolean {
    return !!this._mathmlElement.attributes[flag];
  }
}
