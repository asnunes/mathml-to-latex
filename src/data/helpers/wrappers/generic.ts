import { Wrapper } from './wrapper';

/**
 * Wraps a string with auto-sizing LaTeX delimiters, prefixing the given
 * open/close characters with `\left` and `\right` (e.g. `\left( ... \right)`).
 */
export class GenericWrapper {
  protected _open: string;
  protected _close: string;

  constructor(open: string, close: string) {
    this._open = '\\left' + open;
    this._close = '\\right' + close;
  }

  /** @returns `str` wrapped in `\left`/`\right` delimiters. */
  wrap(str: string): string {
    return new Wrapper(this._open, this._close).wrap(str);
  }
}
