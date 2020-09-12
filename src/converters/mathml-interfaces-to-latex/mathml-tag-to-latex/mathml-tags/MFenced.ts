import { MathMLTag } from './MathMLTag';
import { GenericWrapper } from '../../../../utils/wrappers';
import { JoinWithManySeparators } from '../../../../utils';

export class MFenced extends MathMLTag {
  private _wrapper: GenericWrapper;
  private _separators: string[];

  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mfenced', value, attributes, children);

    const open: string = this._attributes.open || '(';
    const close: string = this._attributes.close || ')';
    this._wrapper = new GenericWrapper(open, close);

    this._separators = Array.from(this._attributes.separators || '');
  }

  convert(): string {
    const withoutWrapper = JoinWithManySeparators.join(this._mapChildrenToLaTeX(), this._separators);
    return this._wrapper.wrap(withoutWrapper);
  }
}
