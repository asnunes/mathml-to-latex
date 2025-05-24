import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';

export class MSpace implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { linebreak } = this._mathmlElement.attributes;

    if (linebreak === 'newline') {
      return ' \\\\ ';
    }

    return ' ';
  }
}
