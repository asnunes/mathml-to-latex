import { MathMLElementToLatexConverterAdapter } from '../data/usecases/mathml-to-latex-convertion/mathml-element-to-latex-converter-adapter';
import { makeToMathElementsConverter } from './factories';

export class MathMLToLaTeX {
  static convert(mathml: string): string {
    const mathmlElements = makeToMathElementsConverter().convert(mathml);
    const mathmlElementsToLaTeXConverters = mathmlElements.map((mathMLElement) =>
      new MathMLElementToLatexConverterAdapter(mathMLElement).toLatexConverter(),
    );
    return mathmlElementsToLaTeXConverters
      .map((toLatexConverters) => toLatexConverters.convert())
      .join('')
      .trim();
  }
}
