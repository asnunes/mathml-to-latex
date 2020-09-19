import { MathMLTag } from './MathMLTag';
import { allMathSymbolsByChar, allMathSymbolsByGlyph } from '../../../../syntax';

export class MI extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mi', value, attributes, children);
  }

  convert(): string {
    const normalizedValue = this._normalizeWhiteSpaces(this._value);
    if (normalizedValue === ' ') return Character.apply(normalizedValue);

    const trimmedValue = normalizedValue.trim();
    return Character.apply(trimmedValue);
  }
}

class Character {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static apply(value: string): string {
    return new Character(value)._apply();
  }

  private _apply(): string {
    return this._findByCharacter() || this._findByGlyph() || this._value;
  }

  private _findByCharacter(): string | undefined {
    return allMathSymbolsByChar[this._value];
  }

  private _findByGlyph(): string | undefined {
    return allMathSymbolsByGlyph[this._value];
  }
}
