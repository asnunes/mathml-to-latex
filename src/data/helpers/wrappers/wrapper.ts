export class Wrapper {
  protected _open: string;
  protected _close: string;

  constructor(open: string, close: string) {
    this._open = open;
    this._close = close;
  }

  wrap(str: string): string {
    return this._open + str + this._close;
  }
}
