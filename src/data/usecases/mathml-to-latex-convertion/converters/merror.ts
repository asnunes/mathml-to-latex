import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';

export class MError implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const latexJoinedChildren = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');

    return `\\color{red}{${latexJoinedChildren}}`;
  }
}
