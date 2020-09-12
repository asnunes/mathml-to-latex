export abstract class Wrapper {
  protected abstract _open: string;
  protected abstract _close: string;

  wrap(str: string): string {
    return this._open + str + this._close;
  }

  wrapIfMoreThanOneChar(str: string): string {
    if (str.length <= 1) return str;
    return this.wrap(str);
  }
}
