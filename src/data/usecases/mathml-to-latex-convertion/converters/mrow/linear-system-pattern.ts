import { MathMLElement } from '../../../../protocols/mathml-element';

/**
 * Detects the linear-system/piecewise shape emitted by editors and MathJax:
 * an `<mrow>` holding an opening `{` operator and an `<mtable>`, optionally
 * followed by an empty closing `<mo>`. The `<mrow>` converter renders this
 * shape as a LaTeX `cases` environment, so the inner table must not receive
 * another environment wrapper of its own.
 */
export class LinearSystemPattern {
  private readonly _element: MathMLElement;

  constructor(element: MathMLElement) {
    this._element = element;
  }

  /** @returns true when the element matches the pattern. */
  static matches(element: MathMLElement): boolean {
    return new LinearSystemPattern(element)._matches();
  }

  private _matches(): boolean {
    if (this._element.name !== 'mrow') return false;

    const children = this._element.children ?? [];
    if (children.length !== 2 && children.length !== 3) return false;

    return this._isOpeningBrace(children[0]) && this._isTable(children[1]) && this._isEmptyClosing(children[2]);
  }

  private _isOpeningBrace(child: MathMLElement): boolean {
    return child.name === 'mo' && child.value.trim() === '{';
  }

  private _isTable(child: MathMLElement): boolean {
    return child.name === 'mtable';
  }

  private _isEmptyClosing(child: MathMLElement | undefined): boolean {
    return child === undefined || (child.name === 'mo' && child.value.trim() === '');
  }
}
