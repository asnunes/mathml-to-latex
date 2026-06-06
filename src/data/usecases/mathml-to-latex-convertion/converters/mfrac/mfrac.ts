import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../../errors';
import { ParenthesisWrapper, mathMLElementToLaTeXConverter } from '../../../../helpers';
import { LineThickness } from './line-thickness';

/**
 * Converts a MathML `<mfrac>` element into a LaTeX fraction.
 *
 * Produces `\frac{numerator}{denominator}` for a default-thickness bar, or the
 * bevelled form `numerator/denominator` (each side wrapped in parentheses when
 * longer than one character) when the `bevelled` attribute is set.
 *
 * When `linethickness` requests a non-default bar, the `\genfrac` form is used so
 * the thickness is preserved: `\genfrac{}{}{<thickness>}{}{numerator}{denominator}`.
 * A zero thickness renders without the bar (used, for instance, inside binomial
 * coefficients). The surrounding parentheses of a binomial coefficient are not
 * added here: in canonical MathML they come from sibling `<mo>`/`<mfenced>`
 * elements and are converted independently. Thickness parsing is delegated to
 * {@link LineThickness}.
 *
 * @example
 * // <mfrac><mn>1</mn><mn>2</mn></mfrac> -> \frac{1}{2}
 * @example
 * // <mfrac bevelled="true"><mn>1</mn><mn>2</mn></mfrac> -> 1/2
 * @example
 * // <mfrac linethickness="0"><mi>n</mi><mi>k</mi></mfrac> -> \genfrac{}{}{0pt}{}{n}{k}
 * @example
 * // <mfrac linethickness="2pt"><mn>1</mn><mn>2</mn></mfrac> -> \genfrac{}{}{2pt}{}{1}{2}
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

    const thickness = new LineThickness(this._mathmlElement.attributes.linethickness).toLaTeX();
    if (thickness !== null) return `\\genfrac{}{}{${thickness}}{}{${num}}{${den}}`;

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
}
