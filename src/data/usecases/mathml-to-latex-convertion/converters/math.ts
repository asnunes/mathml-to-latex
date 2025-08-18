import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, normalizeWhiteSpaces, MatrixPatternDetector } from '../../../helpers';

export class Math implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    // Check if this is a matrix pattern: delimiter + mtable + delimiter
    const matrixDetector = new MatrixPatternDetector(this._mathmlElement);
    if (matrixDetector.isMatrixPattern()) {
      const unnormalizedLatex = matrixDetector.convertAsMatrix();
      return normalizeWhiteSpaces(unnormalizedLatex);
    }

    const unnormalizedLatex = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');

    return normalizeWhiteSpaces(unnormalizedLatex);
  }
}
