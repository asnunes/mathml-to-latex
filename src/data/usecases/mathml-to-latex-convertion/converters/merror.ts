import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';

/**
 * Converts a MathML `<merror>` element into LaTeX.
 *
 * Recursively converts its children, joins them with spaces, and wraps the
 * result in a red `\color` group.
 *
 * @example
 * // <merror><mi>x</mi></merror> -> \color{red}{x}
 */
export class MError implements ToLaTeXConverter {
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

    return `\\color{red}{${latexJoinedChildren}}`;
  }
}
