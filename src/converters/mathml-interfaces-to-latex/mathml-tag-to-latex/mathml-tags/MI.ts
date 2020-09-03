import { MathMLTag } from './MathMLTag';

export class MI extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mi', value, attributes, children);
  }

  convert(): string {
    const normalizedValue = this._normalizeWhiteSpaces(this._value);
    return normalizedValue.trim();
  }

  private _normalizeWhiteSpaces(str: string): string {
    return str.replace(/\s+/g, ' ');
  }
}
