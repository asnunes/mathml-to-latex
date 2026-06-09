import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

/**
 * Converts a MathML `<mtable>` element into LaTeX matrix rows.
 *
 * Each row child is converted and the results are joined with `\\` row
 * separators. Flags set by the tree pre-pass control the wrapper: `innerTable`
 * (table nested in another table) wraps the rows in a `matrix` environment, and
 * `bareTable` (table that no other converter wraps) wraps them in `matrix`, or
 * in `aligned` when the rows look like multiline equation alignment, so `&`/`\\`
 * never end up outside an environment.
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
    const rows = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert());
    const tableContent = rows.join(' \\\\\n');

    // Both flags are set by the iterative pre-pass in tree-to-latex.
    if (this._hasFlag('innerTable')) return this._wrap(tableContent, 'matrix');
    if (this._hasFlag('bareTable')) {
      return this._wrap(tableContent, this._isEquationAlignment(rows) ? 'aligned' : 'matrix');
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

  /**
   * Whether the rows look like multiline equation alignment (the shape editors
   * emit for LaTeX `align`): either the table declares mixed right/left column
   * alignment, or every row breaks right before a relation operator.
   */
  private _isEquationAlignment(rows: string[]): boolean {
    const columnalign = this._mathmlElement.attributes.columnalign ?? '';
    if (columnalign.includes('right') && columnalign.includes('left')) return true;

    if (rows.length === 0) return false;
    return rows.every((row) => startsWithRelation(row.split('&')[1]));
  }
}

/** Relation operators that mark the alignment column of a multiline equation. */
const ALIGNMENT_RELATIONS = [
  '=',
  '<',
  '>',
  '\\le',
  '\\ge',
  '\\leq',
  '\\geq',
  '\\neq',
  '\\ne',
  '\\approx',
  '\\equiv',
  '\\sim',
  '\\simeq',
  '\\cong',
  '\\propto',
  '\\in',
  '\\subset',
  '\\subseteq',
  '\\supset',
  '\\supseteq',
  '\\to',
  '\\rightarrow',
  '\\Rightarrow',
  '\\Leftrightarrow',
  '\\iff',
  '\\mapsto',
];

/** Whether the cell content starts with a relation operator. */
const startsWithRelation = (cell: string | undefined): boolean => {
  if (cell === undefined) return false;

  const trimmed = cell.trim();
  return ALIGNMENT_RELATIONS.some((relation) => trimmed === relation || trimmed.startsWith(`${relation} `));
};
