import { MathML } from '../../interfaces/MathML';
import MathmlToLatex from './xml-to-mathml/mathml-to-latex';
import XmlToMathml from './xml-to-mathml';

export class XmlMathMLToLaTeX {
  constructor(private _mathml: string) {
    this._mathml = _mathml;
  }

  static convert(_mathml: string): string {
    return new XmlMathMLToLaTeX(_mathml).convert();
  }

  convert(): string {
    const mathmlInterfaces: MathML[] = new XmlToMathml(this._mathml).convert();
    return new MathmlToLatex(mathmlInterfaces).convert();
  }
}
