/**
 * Base helper that surrounds a string with an opening and a closing delimiter.
 */
export class Wrapper {
  protected _open: string;
  protected _close: string;

  constructor(open: string, close: string) {
    this._open = open;
    this._close = close;
  }

  /** @returns `str` surrounded by the configured open/close delimiters. */
  wrap(str: string): string {
    return this._open + str + this._close;
  }
}
