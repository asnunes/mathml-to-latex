import { Wrapper } from './wrapper';

/**
 * Wraps a string in LaTeX curly braces (`{ ... }`), e.g. for subscript and
 * superscript arguments.
 */
export class BracketWrapper {
  protected _open = '{';
  protected _close = '}';

  /** @returns `str` wrapped in curly braces. */
  wrap(str: string): string {
    return new Wrapper(this._open, this._close).wrap(str);
  }
}
