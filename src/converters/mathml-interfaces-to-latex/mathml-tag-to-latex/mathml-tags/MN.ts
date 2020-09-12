import { MathMLTag } from './MathMLTag';

export class MN extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mn', value, attributes, children);
  }

  convert(): string {
    const normalizedValue = this._normalizeWhiteSpaces(this._value);
    return normalizedValue.trim();
  }
}
