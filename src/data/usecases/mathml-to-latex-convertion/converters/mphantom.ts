import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';

/**
 * Converts a MathML `<mphantom>` element into LaTeX.
 *
 * The element reserves layout space without rendering content, so it produces
 * an empty string.
 *
 * @example
 * // <mphantom>x</mphantom> -> ''
 */
export class MPhantom implements ToLaTeXConverter {
  private readonly _mathmlElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    return '';
  }
}
