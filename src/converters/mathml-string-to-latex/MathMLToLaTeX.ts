import { MathML } from '../../interfaces/MathML';
import MathMLInterfacesToLaTeX from '../mathml-interfaces-to-latex';
import MathMLStringToInterfaces from '../mathml-string-to-mathml-interfaces';

export class MathMLToLaTeX {
  constructor(private _mathml: string) {
    this._mathml = _mathml;
  }

  static convert(_mathml: string): string {
    return new MathMLToLaTeX(_mathml).convert();
  }

  convert(): string {
    const mathmlInterfaces: MathML[] = new MathMLStringToInterfaces(this._mathml).convert();
    return new MathMLInterfacesToLaTeX(mathmlInterfaces).convert();
  }
}
