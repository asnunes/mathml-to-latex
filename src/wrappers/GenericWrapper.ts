import { Wrapper } from './Wrapper';

export class GenericWrapper extends Wrapper {
  protected _open: string;
  protected _close: string;

  constructor(open: string, close: string) {
    super();
    this._open = '\\left' + open;
    this._close = '\\right' + close;
  }
}
