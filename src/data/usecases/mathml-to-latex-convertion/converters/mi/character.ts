import { ownLookup } from '../../../../helpers';
import { allMathSymbolsByChar, allMathSymbolsByGlyph, mathNumberByGlyph } from '../../../../../syntax';
import { HashUTF8ToLtXConverter } from '../../../../../syntax/utf8-converter';

/** Resolves a single identifier value to its LaTeX command via symbol lookup tables, falling back to UTF-8 conversion. */
export class Character {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static apply(value: string): string {
    return new Character(value)._apply();
  }

  private _apply(): string {
    return (
      this._findByCharacter() ||
      this._findByGlyph() ||
      this._findByNumber() ||
      new HashUTF8ToLtXConverter().convert(this._value)
    );
  }

  private _findByCharacter(): string | undefined {
    return ownLookup(allMathSymbolsByChar, this._value);
  }

  private _findByGlyph(): string | undefined {
    return ownLookup(allMathSymbolsByGlyph, this._value);
  }

  private _findByNumber(): string | undefined {
    return ownLookup(mathNumberByGlyph, this._value);
  }
}
