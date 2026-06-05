import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';

/**
 * Converts a MathML `<maction>` element into LaTeX.
 *
 * For toggle actions (or when `actiontype` is absent) it joins all child
 * conversions with `\Longrightarrow`; otherwise it converts only the first child.
 *
 * @example
 * // <maction actiontype="toggle"><mi>a</mi><mi>b</mi></maction> -> a \Longrightarrow b
 */
export class MAction implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const { children } = this._mathmlElement;

    if (this._isToggle())
      return children
        .map((child) => mathMLElementToLaTeXConverter(child))
        .map((converter) => converter.convert())
        .join(' \\Longrightarrow ');

    return mathMLElementToLaTeXConverter(children[0]).convert();
  }

  /** True when the action is a toggle, i.e. `actiontype` is 'toggle' or unset. */
  private _isToggle(): boolean {
    const { actiontype } = this._mathmlElement.attributes;
    return actiontype === 'toggle' || !actiontype;
  }
}
