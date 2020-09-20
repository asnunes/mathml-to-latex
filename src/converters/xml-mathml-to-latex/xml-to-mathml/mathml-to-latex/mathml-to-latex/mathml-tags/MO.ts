import { MathMLTag } from './MathMLTag';
import { allMathOperatorsByChar, allMathOperatorsByGlyph } from '../../../../../../syntax';

export class MO extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mo', value, attributes, children);
  }

  convert(): string {
    const normalizedValue = this._normalizeWhiteSpaces(this._value);
    const trimmedValue = normalizedValue.trim();

    return Operator.operate(trimmedValue);
  }
}

class Operator {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static operate(value: string): string {
    return new Operator(value)._operate();
  }

  private _operate(): string {
    return this._findByCharacter() || this._findByGlyph() || this._value;
  }

  private _findByCharacter(): string | undefined {
    return allMathOperatorsByChar[this._value];
  }

  private _findByGlyph(): string | undefined {
    return allMathOperatorsByGlyph[this._value];
  }
}
