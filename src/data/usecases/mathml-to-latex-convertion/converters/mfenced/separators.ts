import { GenericWrapper } from '../../../../helpers';

/** Classifies a pair of open/close fences and wraps content in them. */
export class Separators {
  constructor(
    private readonly open: string,
    private readonly close: string,
  ) {}

  wrap(str: string): string {
    return new GenericWrapper(this.open, this.close).wrap(str);
  }

  areParentheses(): boolean {
    return this._compare('(', ')');
  }

  areSquareBrackets(): boolean {
    return this._compare('[', ']');
  }

  areBrackets(): boolean {
    return this._compare('{', '}');
  }

  areDivides(): boolean {
    return this._compare('|', '|');
  }

  areParallels(): boolean {
    return this._compare('||', '||');
  }

  areNotEqual(): boolean {
    return this.open !== this.close;
  }

  private _compare(openToCompare: string, closeToCompare: string): boolean {
    return this.open === openToCompare && this.close === closeToCompare;
  }
}
