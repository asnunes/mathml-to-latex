import { Wrapper } from './Wrapper';

export class ParenthesisWrapper extends Wrapper {
  protected _openChar = '\\left(';
  protected _closeChar = '\\right)';
}
