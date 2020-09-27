import { MathMLElement } from '@/data/protocols/mathml-element';
import { ToLaTeXConverter } from '@/domain/usecases/to-latex-converter';
import { MathMLElementToLatexConverterAdapter } from '../usecases/mathml-to-latex-convertion/mathml-element-to-latex-converter-adapter';

export const mathMLElementToLaTeXConverter = (mathMLElement: MathMLElement): ToLaTeXConverter =>
  new MathMLElementToLatexConverterAdapter(mathMLElement).toLatexConverter();
