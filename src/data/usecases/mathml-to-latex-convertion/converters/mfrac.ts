import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors';
import { ParenthesisWrapper, mathMLElementToLaTeXConverter } from '../../../helpers';

/**
 * Converts a MathML `<mfrac>` element into a LaTeX fraction.
 *
 * Produces `\frac{numerator}{denominator}`, or the bevelled form
 * `numerator/denominator` (each side wrapped in parentheses when longer than one
 * character) when the `bevelled` attribute is set.
 *
 * When `linethickness="0"` the fraction bar is omitted, producing the bar-less
 * `\genfrac{}{}{0pt}{}{numerator}{denominator}` form (used, for instance, inside
 * binomial coefficients). The surrounding parentheses of a binomial coefficient
 * are not added here: in canonical MathML they come from sibling `<mo>`/`<mfenced>`
 * elements and are converted independently.
 *
 * @example
 * // <mfrac><mn>1</mn><mn>2</mn></mfrac> -> \frac{1}{2}
 * @example
 * // <mfrac bevelled="true"><mn>1</mn><mn>2</mn></mfrac> -> 1/2
 * @example
 * // <mfrac linethickness="0"><mi>n</mi><mi>k</mi></mfrac> -> \genfrac{}{}{0pt}{}{n}{k}
 */
export class MFrac implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   * @throws {InvalidNumberOfChildrenError} if the element does not have exactly 2 children.
   */
  convert(): string {
    const { children, name } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 2) throw new InvalidNumberOfChildrenError(name, 2, childrenLength);

    const num = mathMLElementToLaTeXConverter(children[0]).convert();
    const den = mathMLElementToLaTeXConverter(children[1]).convert();

    if (this._isBevelled()) return `${this._wrapIfMoreThanOneChar(num)}/${this._wrapIfMoreThanOneChar(den)}`;

    if (this._hasNoBar()) return `\\genfrac{}{}{0pt}{}{${num}}{${den}}`;

    return `\\frac{${num}}{${den}}`;
  }

  /** Wraps the bevelled-fraction side in parentheses when it is longer than one character. */
  private _wrapIfMoreThanOneChar(str: string): string {
    return new ParenthesisWrapper().wrapIfMoreThanOneChar(str);
  }

  /** Whether the `bevelled` attribute requests the inline `a/b` form. */
  private _isBevelled(): boolean {
    return !!this._mathmlElement.attributes.bevelled;
  }

  /**
   * Whether `linethickness` is zero, requesting a bar-less fraction.
   *
   * Accepts any unit since `0`, `0pt`, `0px`, `0.0`, etc. all denote zero
   * thickness in MathML.
   */
  private _hasNoBar(): boolean {
    const linethickness = this._mathmlElement.attributes.linethickness;
    if (!linethickness) return false;
    return parseFloat(linethickness) === 0;
  }
}
