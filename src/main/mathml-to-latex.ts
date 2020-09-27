import { MathMLElementToLatexConverterAdapter } from '@/data/usecases/mathml-to-latex-convertion/mathml-element-to-latex-converter-adapter';
import { XmlToMathMLAdapter } from '@/infra/usecases/xmldom-to-mathml-elements';

export class MathMLToLaTeX {
  static convert(mathml: string): string {
    const mathmlElements = new XmlToMathMLAdapter(mathml).convert();
    const mathmlElementsToLaTeXConverters = mathmlElements.map((mathMLElement) =>
      new MathMLElementToLatexConverterAdapter(mathMLElement).toLatexConverter(),
    );
    return mathmlElementsToLaTeXConverters.map((toLatexConverters) => toLatexConverters.convert()).join('');
  }
}
