import { MathMLTag } from './MathMLTag';

export class MTr extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mtr', value, attributes, children);
  }

  convert(): string {
    return this._mapChildrenToLaTeX().join(' & ');
  }
}
