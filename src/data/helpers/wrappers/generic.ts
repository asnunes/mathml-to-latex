import { Wrapper } from './wrapper';

/**
 * Wraps a string with auto-sizing LaTeX delimiters, prefixing the given
 * open/close characters with `\left` and `\right` (e.g. `\left( ... \right)`).
 */
export class GenericWrapper {
  protected _open: string;
  protected _close: string;

  constructor(open: string, close: string) {
    this._open = '\\left' + this._toLatexDelimiter(open);
    this._close = '\\right' + this._toLatexDelimiter(close);
  }

  /** @returns `str` wrapped in `\left`/`\right` delimiters. */
  wrap(str: string): string {
    return new Wrapper(this._open, this._close).wrap(str);
  }

  /**
   * Maps a MathML fence character to a valid `\left`/`\right` delimiter:
   * braces are grouping characters so a bare `{`/`}` must be escaped to `\{`/`\}`,
   * and a double bar `||` is the norm delimiter `\|` (a bare `\left||` would be a
   * stretchy bar followed by a literal one).
   */
  private _toLatexDelimiter(delimiter: string): string {
    if (delimiter === '{' || delimiter === '}') return '\\' + delimiter;
    if (delimiter === '||') return '\\|';
    return delimiter;
  }
}
