import { MathMLElement } from '../../../../protocols/mathml-element';

/**
 * Detects whether a `<mtable>` represents multiline equation alignment (the
 * shape LaTeX-to-MathML emitters produce for `align`/`align*`), deciding from
 * the input tree only:
 *
 * - a `columnalign` declaration (on the table, its rows or its cells) mixing
 *   `right` and `left` columns, which is how MathJax/LaTeXML encode alignment;
 * - or every row breaking right before a relation operator, i.e. the second
 *   cell of every `<mtr>` starting with a relational `<mo>`.
 *
 * Used by the `<mtable>` converter to pick `aligned` over `matrix` when it has
 * to wrap a bare table in an environment.
 */
export class EquationAlignment {
  private readonly _table: MathMLElement;

  constructor(table: MathMLElement) {
    this._table = table;
  }

  /** @returns true when the table looks like multiline equation alignment. */
  static matches(table: MathMLElement): boolean {
    return new EquationAlignment(table)._matches();
  }

  private _matches(): boolean {
    return this._declaresMixedColumnAlignment() || this._everyRowBreaksBeforeRelation();
  }

  /** Whether `columnalign` on the table, a row or a cell mixes right and left columns. */
  private _declaresMixedColumnAlignment(): boolean {
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

  /** Whether every row has its second cell starting with a relational operator. */
  private _everyRowBreaksBeforeRelation(): boolean {
    const rows = this._rows();
    if (rows.length === 0) return false;

    return rows.every((row) => this._startsWithRelation(this._cells(row)[1]));
  }

  private _startsWithRelation(cell: MathMLElement | undefined): boolean {
    const firstChild = cell?.children[0];
    if (firstChild === undefined || firstChild.name !== 'mo') return false;

    return RELATION_OPERATORS.has(firstChild.value.trim());
  }

  private _rows(): MathMLElement[] {
    return this._table.children.filter((child) => child.name === 'mtr');
  }

  private _cells(row: MathMLElement): MathMLElement[] {
    return row.children.filter((child) => child.name === 'mtd');
  }
}

/** Relational operator characters, as they appear in `<mo>` content after XML decoding. */
const RELATION_OPERATORS = new Set([
  '=',
  '<',
  '>',
  '≠',
  '≤',
  '≥',
  '≦',
  '≧',
  '≪',
  '≫',
  '≈',
  '∼',
  '≃',
  '≅',
  '≡',
  '∝',
  '∈',
  '∉',
  '⊂',
  '⊃',
  '⊆',
  '⊇',
  '→',
  '⇒',
  '⇔',
  '↦',
]);
