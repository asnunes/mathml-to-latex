import { MathMLTag } from './MathMLTag';
import { GenericWrapper } from '../../../../wrappers';

export class MFenced extends MathMLTag {
  private _wrapper: GenericWrapper;

  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mfenced', value, attributes, children);

    const open: string = this._attributes.open || '.';
    const close: string = this._attributes.close || '.';
    this._wrapper = new GenericWrapper(open, close);
  }

  convert(): string {
    return this._wrapper.wrap(this._mapChildrenToLaTeX().join(' '));
  }
}
