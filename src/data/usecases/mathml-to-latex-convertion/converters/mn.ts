import { ToLaTeXConverter } from '@/domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { normalizeWhiteSpaces } from '../../../helpers';

export class MN implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const normalizedValue = normalizeWhiteSpaces(this._mathmlElement.value);
    return normalizedValue.trim();
  }
}
