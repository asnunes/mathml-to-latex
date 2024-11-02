import { ToLaTeXConverter } from 'domain/usecases/to-latex-converter';

export class Void implements ToLaTeXConverter {
  constructor(private readonly _mathmlElement: MathMLElement) {}

  convert(): string {
    return '';
  }
}
