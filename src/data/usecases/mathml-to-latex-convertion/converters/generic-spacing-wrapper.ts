import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

/**
 * Fallback converter that recursively converts every child and joins the
 * results with single spaces.
 *
 * Used for container-like MathML elements that have no special LaTeX rendering
 * of their own and simply pass their children through.
 *
 * @example
 * // <mtd><mi>a</mi><mo>+</mo><mi>b</mi></mtd> -> a + b
 */
export class GenericSpacingWrapper implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    return this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');
  }
}
