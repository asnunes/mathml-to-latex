import { convertTreeToLatex } from '../data/usecases/mathml-to-latex-convertion/tree-to-latex';
import { makeToMathElementsConverter } from './factories';

/**
 * Public entry point of the library: converts a MathML string into LaTeX.
 *
 * The conversion runs in two stages — the MathML is parsed into an internal
 * element tree (see {@link makeToMathElementsConverter}), then each top-level
 * element tree is converted to LaTeX iteratively (see {@link convertTreeToLatex}).
 *
 * @example
 * MathMLToLaTeX.convert('<math><mrow><mn>a</mn><mo>+</mo><mn>b</mn></mrow></math>');
 * // => 'a + b'
 */
export class MathMLToLaTeX {
  /**
   * Converts a MathML string to its LaTeX representation.
   *
   * @param mathml - the MathML markup to convert.
   * @returns the equivalent LaTeX string (trimmed).
   */
  static convert(mathml: string): string {
    const mathmlElements = makeToMathElementsConverter().convert(mathml);
    return mathmlElements
      .map((mathMLElement) => convertTreeToLatex(mathMLElement))
      .join('')
      .trim();
  }
}
