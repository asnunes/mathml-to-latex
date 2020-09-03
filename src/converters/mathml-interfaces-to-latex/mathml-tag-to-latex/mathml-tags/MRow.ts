import { MathMLTag } from './MathMLTag';

export class MRow extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mrow', value, attributes, children);
  }

  convert(): string {
    return this._mapChildrenToLaTeX().join(' ');
  }
}
