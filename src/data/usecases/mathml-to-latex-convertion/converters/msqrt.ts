import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

/**
 * Converts a MathML `<msqrt>` element into a LaTeX square root.
 *
 * Recursively converts every child, joins the results with spaces and wraps
 * them in `\sqrt{...}`.
 *
 * @example
 * // <msqrt><mn>2</mn></msqrt> -> \sqrt{2}
 */
export class MSqrt implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const latexJoinedChildren = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');

    return `\\sqrt{${latexJoinedChildren}}`;
  }
}
