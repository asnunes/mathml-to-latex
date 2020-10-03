import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { normalizeWhiteSpaces } from '../../../helpers';
import { allMathSymbolsByChar, allMathSymbolsByGlyph } from '../../../../syntax';

export class MI implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const normalizedValue = normalizeWhiteSpaces(this._mathmlElement.value);
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
