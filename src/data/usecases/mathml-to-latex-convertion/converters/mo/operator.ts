import { ownLookup } from '../../../../helpers';
import {
  HashUTF8ToLtXConverter,
  LatexSpecials,
  allMathOperatorsByChar,
  allMathOperatorsByGlyph,
  mathNumberByGlyph,
} from '../../../../../syntax';

/** Resolves a single operator value to its LaTeX command via operator lookup tables, falling back to UTF-8 conversion. */
export class Operator {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static operate(value: string): string {
    return new Operator(value)._operate();
  }

  private _operate(): string {
    // `??` instead of `||`: entries mapped to an empty string (e.g. the
    // invisible operators U+2061-U+2064) are valid results, not lookup misses.
    const mapped = this._findByCharacter() ?? this._findByGlyph() ?? this._findByNumber();
    if (mapped !== undefined) return mapped;

    const converted = new HashUTF8ToLtXConverter().convert(this._value);
    if (converted !== this._value) return converted;

    // No mapping anywhere: the value reaches the output verbatim, so LaTeX
    // specials must be escaped to stay literal glyphs.
    return LatexSpecials.escapeForMath(this._value);
  }

  private _findByCharacter(): string | undefined {
    return ownLookup(allMathOperatorsByChar, this._value);
  }

  private _findByGlyph(): string | undefined {
    return ownLookup(allMathOperatorsByGlyph, this._value);
  }

  private _findByNumber(): string | undefined {
    return ownLookup(mathNumberByGlyph, this._value);
  }
}
