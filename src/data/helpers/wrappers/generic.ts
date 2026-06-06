import { Wrapper } from './wrapper';

/**
 * Wraps a string with auto-sizing LaTeX delimiters, prefixing the given
 * open/close characters with `\left` and `\right` (e.g. `\left( ... \right)`).
 */
export class GenericWrapper {
  protected _open: string;
  protected _close: string;

  constructor(open: string, close: string) {
    this._open = '\\left' + this._escapeDelimiter(open);
    this._close = '\\right' + this._escapeDelimiter(close);
  }

  /** @returns `str` wrapped in `\left`/`\right` delimiters. */
  wrap(str: string): string {
    return new Wrapper(this._open, this._close).wrap(str);
  }

  /**
   * Braces are grouping characters in LaTeX, so a bare `{`/`}` is not a valid
   * `\left`/`\right` delimiter. They must be escaped to `\{`/`\}`.
   */
  private _escapeDelimiter(delimiter: string): string {
    if (delimiter === '{' || delimiter === '}') return '\\' + delimiter;
    return delimiter;
  }
}
