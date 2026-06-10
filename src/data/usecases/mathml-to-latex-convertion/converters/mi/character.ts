import { ownLookup } from '../../../../helpers';
import { LatexSpecials, allMathSymbolsByChar, allMathSymbolsByGlyph, mathNumberByGlyph } from '../../../../../syntax';
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

  /** The lookup-table mapping for the value, or undefined when only the fallbacks would apply. */
  static findMapping(value: string): string | undefined {
    const character = new Character(value);

    // `??` instead of `||`: entries mapped to an empty string (e.g. the
    // invisible operators U+2061-U+2064) are valid results, not lookup misses.
    return character._findByCharacter() ?? character._findByGlyph() ?? character._findByNumber();
  }

  private _apply(): string {
    const mapped = Character.findMapping(this._value);
    if (mapped !== undefined) return mapped;

    const converted = new HashUTF8ToLtXConverter().convert(this._value);
    if (converted !== this._value) return converted;

    // No mapping anywhere: the value reaches the output verbatim, so LaTeX
    // specials must be escaped to stay literal glyphs.
    return LatexSpecials.escapeForMath(this._value);
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
