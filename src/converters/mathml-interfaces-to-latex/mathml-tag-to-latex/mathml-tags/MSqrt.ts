import { MathMLTag } from './MathMLTag';

export class MSqrt extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('msqrt', value, attributes, children);
  }

  convert(): string {
    const content = this._mapChildrenToLaTeX().join(' ');
    return `\\sqrt{${content}}`;
  }
}
