import { MathMLTag } from './MathMLTag';

export class MError extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('merror', value, attributes, children);
  }

  convert(): string {
    return `\\color{red}{${this._mapChildrenToLaTeX().join(' ')}}`;
  }
}
