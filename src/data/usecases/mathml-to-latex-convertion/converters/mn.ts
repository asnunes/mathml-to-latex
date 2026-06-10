import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { normalizeWhiteSpaces, ownLookup } from '../../../helpers';
import { LatexSpecials, mathNumberByGlyph } from '../../../../syntax';

/**
 * Converts a MathML `<mn>` (number) element into LaTeX.
 *
 * Normalizes/trims the value and maps it through the number-by-glyph table,
 * returning the normalized value with LaTeX specials escaped when no mapping
 * exists (`#1` would otherwise not even compile).
 *
 * @example
 * // <mn>42</mn> -> 42
 */
export class MN implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const normalizedValue = normalizeWhiteSpaces(this._mathmlElement.value).trim();
    const convertedValue = ownLookup(mathNumberByGlyph, normalizedValue);
    if (convertedValue !== undefined) return convertedValue;

    return LatexSpecials.escapeForMath(normalizedValue);
  }
}
