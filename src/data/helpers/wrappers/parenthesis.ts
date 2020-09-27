import { Wrapper } from './wrapper';

export class ParenthesisWrapper {
  protected _open = '\\left(';
  protected _close = '\\right)';

  wrap(str: string): string {
    return new Wrapper(this._open, this._close).wrap(str);
  }

  wrapIfMoreThanOneChar(str: string): string {
    if (str.length <= 1) return str;
    return this.wrap(str);
  }
}
