import { MathMLTag } from './MathMLTag';
import { GenericWrapper } from '../../../../utils/wrappers';
import { JoinWithManySeparators } from '../../../../utils';

export class MFenced extends MathMLTag {
  private readonly _open: string;
  private readonly _close: string;
  private readonly _separators: string[];

  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mfenced', value, attributes, children);

    this._open = this._attributes.open || '(';
    this._close = this._attributes.close || ')';
    this._separators = Array.from(this._attributes.separators || '');
  }

  convert(): string {
    return new Vector(this._open, this._close, this._separators).apply(this._mapChildrenToLaTeX());
  }
}

class Vector {
  private readonly _open: string;
  private readonly _close: string;
  private readonly _separators: string[];

  constructor(open: string, close: string, separators: string[]) {
    this._open = open;
    this._close = close;
    this._separators = separators;
  }

  apply(latexContents: string[]): string {
    const contentWithoutWrapper = JoinWithManySeparators.join(latexContents, this._separators);

    return new GenericWrapper(this._open, this._close).wrap(contentWithoutWrapper);
  }
}
