import { MathMLTag } from './MathMLTag';

export class MO extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mo', value, attributes, children);
  }

  convert(): string {
    const normalizedValue = this._normalizeWhiteSpaces(this._value);
    return normalizedValue.trim();
  }
}
