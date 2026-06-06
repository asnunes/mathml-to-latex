import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors';
import { ParenthesisWrapper, mathMLElementToLaTeXConverter } from '../../../helpers';

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
 * elements and are converted independently.
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

    const thickness = this._barThickness();
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

  /**
   * Resolves the `linethickness` attribute to a LaTeX bar thickness for `\genfrac`.
   *
   * @returns the LaTeX dimension to use, or `null` to keep the default-thickness
   * `\frac` bar. Mappings that LaTeX cannot reproduce exactly (unitless
   * multipliers of the renderer-defined default thickness, the `thin`/`thick`
   * keywords, percentages and pixels) are approximated in points.
   */
  private _barThickness(): string | null {
    const raw = this._mathmlElement.attributes.linethickness;
    if (!raw) return null;

    const value = raw.trim().toLowerCase();

    // Keywords. `medium` equals the default bar; `thin`/`thick` are renderer-defined.
    if (value === 'medium') return null;
    if (value === 'thin') return formatPoints(DEFAULT_RULE_THICKNESS_PT * 0.5);
    if (value === 'thick') return formatPoints(DEFAULT_RULE_THICKNESS_PT * 2);

    const match = value.match(/^(-?\d*\.?\d+)\s*([a-z%]*)$/);
    if (!match) return null;

    const amount = parseFloat(match[1]);
    const unit = match[2];

    if (amount === 0) return '0pt';

    // Unitless number: a multiplier of the (renderer-defined) default rule thickness.
    if (unit === '') return amount === 1 ? null : formatPoints(amount * DEFAULT_RULE_THICKNESS_PT);

    // Pixels: not a TeX unit, approximated with points (1px = 0.75pt at 96dpi).
    if (unit === 'px') return formatPoints(amount * PT_PER_PX);

    // Percentage: relative to the default rule thickness.
    if (unit === '%') return formatPoints((amount / 100) * DEFAULT_RULE_THICKNESS_PT);

    // Absolute lengths LaTeX understands: pass through unchanged.
    if (TEX_LENGTH_UNITS.includes(unit)) return `${amount}${unit}`;

    // Unknown unit: fall back to the default bar.
    return null;
  }
}

/** Approximation of the default fraction rule thickness, which MathML leaves unspecified. */
const DEFAULT_RULE_THICKNESS_PT = 0.4;

/** Points per CSS pixel at 96dpi (1px = 1/96in, 1pt = 1/72in). */
const PT_PER_PX = 0.75;

/** Length units LaTeX can consume directly inside a `\genfrac` thickness slot. */
const TEX_LENGTH_UNITS = ['pt', 'pc', 'in', 'cm', 'mm', 'em', 'ex', 'bp', 'dd', 'cc'];

/** Formats a point value, trimming floating-point noise (e.g. `0.8pt`). */
function formatPoints(valuePt: number): string {
  return `${Math.round(valuePt * 10000) / 10000}pt`;
}
