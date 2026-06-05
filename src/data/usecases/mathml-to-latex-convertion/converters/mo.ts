import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { normalizeWhiteSpaces } from '../../../helpers';
import {
  HashUTF8ToLtXConverter,
  allMathOperatorsByChar,
  allMathOperatorsByGlyph,
  mathNumberByGlyph,
} from '../../../../syntax';

/**
 * Converts a MathML `<mo>` (operator) element into LaTeX.
 *
 * Normalizes/trims the value and resolves it to a LaTeX command through the
 * operator lookup tables, falling back to UTF-8 conversion.
 *
 * @example
 * // <mo>&#x2211;</mo> -> \sum
 */
export class MO implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const normalizedValue = normalizeWhiteSpaces(this._mathmlElement.value);
    const trimmedValue = normalizedValue.trim();

    return Operator.operate(trimmedValue);
  }
}

/** Resolves a single operator value to its LaTeX command via operator lookup tables, falling back to UTF-8 conversion. */
class Operator {
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
    return allMathOperatorsByChar[this._value];
  }

  private _findByGlyph(): string | undefined {
    return allMathOperatorsByGlyph[this._value];
  }

  private _findByNumber(): string | undefined {
    return mathNumberByGlyph[this._value];
  }
}
