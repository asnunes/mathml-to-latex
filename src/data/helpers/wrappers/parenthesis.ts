import { Wrapper } from './wrapper';

/**
 * Wraps a string in auto-sizing LaTeX parentheses (`\left( ... \right)`).
 */
export class ParenthesisWrapper {
  protected _open = '\\left(';
  protected _close = '\\right)';

  /** @returns `str` wrapped in `\left(`/`\right)`. */
  wrap(str: string): string {
    return new Wrapper(this._open, this._close).wrap(str);
  }

  /** @returns `str` wrapped in parentheses only when it is longer than one char. */
  wrapIfMoreThanOneChar(str: string): string {
    if (str.length <= 1) return str;
    return this.wrap(str);
  }
}
