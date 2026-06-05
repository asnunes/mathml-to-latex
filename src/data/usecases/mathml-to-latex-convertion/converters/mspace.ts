import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';

/**
 * Converts a MathML `<mspace>` element into LaTeX.
 *
 * Emits a LaTeX line break when `linebreak="newline"`, otherwise a single space.
 *
 * @example
 * // <mspace linebreak="newline" /> ->  \\
 */
export class MSpace implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const { linebreak } = this._mathmlElement.attributes;

    if (linebreak === 'newline') {
      return ' \\\\ ';
    }

    return ' ';
  }
}
