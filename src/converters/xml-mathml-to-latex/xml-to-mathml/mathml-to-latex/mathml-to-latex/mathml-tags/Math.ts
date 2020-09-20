import { MathMLTag } from './MathMLTag';

export class Math extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('math', value, attributes, children);
  }

  convert(): string {
    return this._normalizeWhiteSpaces(this._mapChildrenToLaTeX().join(''));
  }
}
