import { Wrapper } from './Wrapper';

export class ParenthesisWrapper extends Wrapper {
  protected _open = '\\left(';
  protected _close = '\\right)';
}
