import { convertTreeToLatex } from '../data/usecases/mathml-to-latex-convertion/tree-to-latex';
import { makeToMathElementsConverter } from './factories';

export class MathMLToLaTeX {
  static convert(mathml: string): string {
    const mathmlElements = makeToMathElementsConverter().convert(mathml);
    return mathmlElements
      .map((mathMLElement) => convertTreeToLatex(mathMLElement))
      .join('')
      .trim();
  }
}
