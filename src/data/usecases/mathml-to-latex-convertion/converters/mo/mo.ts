import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { normalizeWhiteSpaces } from '../../../../helpers';
import { Operator } from './operator';

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
