import { Wrapper } from './wrapper';

export class BracketWrapper {
  protected _open = '{';
  protected _close = '}';

  wrap(str: string): string {
    return new Wrapper(this._open, this._close).wrap(str);
  }
}
