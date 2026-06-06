import { ownLookup } from '../../../../helpers';
import {
  HashUTF8ToLtXConverter,
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
    return (
      this._findByCharacter() ||
      this._findByGlyph() ||
      this._findByNumber() ||
      new HashUTF8ToLtXConverter().convert(this._value)
    );
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
