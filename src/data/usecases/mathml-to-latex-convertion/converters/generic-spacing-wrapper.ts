import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, MatrixPatternDetector } from '../../../helpers';

export class GenericSpacingWrapper implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    // Check if this is a matrix pattern: delimiter + mtable + delimiter
    const matrixDetector = new MatrixPatternDetector(this._mathmlElement);
    if (matrixDetector.isMatrixPattern()) {
      return matrixDetector.convertAsMatrix();
    }

    return this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');
  }
}
