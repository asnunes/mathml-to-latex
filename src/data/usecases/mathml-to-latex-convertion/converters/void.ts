import { ToLaTeXConverter } from 'domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';

/**
 * No-op converter for MathML elements that have no LaTeX representation.
 *
 * Always produces an empty string, used as a fallback/placeholder converter.
 *
 * @example
 * // any element -> ''
 */
export class Void implements ToLaTeXConverter {
  constructor(private readonly _mathmlElement: MathMLElement) {}

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    return '';
  }
}
