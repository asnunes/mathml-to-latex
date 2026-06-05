import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';
import { normalizeWhiteSpaces } from '../../../helpers/normalize-whitespace';

/**
 * Converts a MathML `<math>` root element into LaTeX.
 *
 * Recursively converts every child to LaTeX, joins the results with spaces
 * and normalizes the resulting whitespace.
 *
 * @example
 * // <math><mi>x</mi><mo>=</mo><mn>1</mn></math> -> x = 1
 */
export class Math implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const unnormalizedLatex = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');

    return normalizeWhiteSpaces(unnormalizedLatex);
  }
}
