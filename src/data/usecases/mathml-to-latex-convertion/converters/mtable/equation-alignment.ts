import { MathMLElement } from '../../../../protocols/mathml-element';

/**
 * Detects whether a `<mtable>` declares multiline equation alignment, the
 * shape LaTeX-to-MathML emitters (MathJax, LaTeXML) produce for `align`: a
 * `columnalign` declaration, on the table or spread over its rows/cells,
 * mixing `right` and `left` columns.
 *
 * The decision deliberately reads formatting metadata only, never cell
 * content: per the MathML spec a table without `columnalign` defaults to
 * centered columns, so inferring alignment from what the cells contain would
 * contradict the declared presentation.
 *
 * Used by the `<mtable>` converter to pick `aligned` over `matrix` when it has
 * to wrap a bare table in an environment.
 */
export class EquationAlignment {
  private readonly _table: MathMLElement;

  constructor(table: MathMLElement) {
    this._table = table;
  }

  /** @returns true when the table declares mixed right/left column alignment. */
  static matches(table: MathMLElement): boolean {
    return new EquationAlignment(table)._matches();
  }

  private _matches(): boolean {
    const tokens = new Set(this._columnAlignTokens());
    return tokens.has('right') && tokens.has('left');
  }

  private _columnAlignTokens(): string[] {
    const rows = this._rows();
    const cells = rows.reduce<MathMLElement[]>((acc, row) => acc.concat(this._cells(row)), []);

    return [this._table, ...rows, ...cells]
      .map((element) => element.attributes.columnalign)
      .filter((value): value is string => !!value)
      .reduce<string[]>((acc, value) => acc.concat(value.trim().split(/\s+/)), []);
  }

  private _rows(): MathMLElement[] {
    return this._table.children.filter((child) => child.name === 'mtr');
  }

  private _cells(row: MathMLElement): MathMLElement[] {
    return row.children.filter((child) => child.name === 'mtd');
  }
}
