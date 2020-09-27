import { ToLaTeXConverter } from '@/domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';

export class MAction implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { children } = this._mathmlElement;

    if (this._isToggle())
      return children
        .map((child) => mathMLElementToLaTeXConverter(child))
        .map((converter) => converter.convert())
        .join(' \\Longrightarrow ');

    return mathMLElementToLaTeXConverter(children[0]).convert();
  }

  private _isToggle(): boolean {
    const { actiontype } = this._mathmlElement.attributes;
    return actiontype === 'toggle' || !actiontype;
  }
}
