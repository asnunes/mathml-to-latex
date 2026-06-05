import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { normalizeWhiteSpaces } from '../../../helpers';
import { mathNumberByGlyph } from '../../../../syntax';

/**
 * Converts a MathML `<mn>` (number) element into LaTeX.
 *
 * Normalizes/trims the value and maps it through the number-by-glyph table,
 * returning the raw normalized value when no mapping exists.
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
    const convertedValue = mathNumberByGlyph[normalizedValue];

    return convertedValue || normalizedValue;
  }
}
