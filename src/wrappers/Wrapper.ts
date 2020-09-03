export abstract class Wrapper {
  protected abstract _openChar: string;
  protected abstract _closeChar: string;

  wrap(str: string): string {
    return this._openChar + str + this._closeChar;
  }

  wrapIfMoreThanOneChar(str: string): string {
    if (str.length <= 1) return str;
    return this.wrap(str);
  }
}
