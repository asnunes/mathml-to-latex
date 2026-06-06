/**
 * Value object that interprets a MathML `<mfrac>` `linethickness` attribute and
 * resolves it to a LaTeX bar thickness usable in `\genfrac`.
 *
 * Mappings that LaTeX cannot reproduce exactly are approximated in points:
 * unitless multipliers of the (renderer-defined) default rule thickness, the
 * `thin`/`thick` keywords, percentages and pixels.
 *
 * @example
 * // new LineThickness(undefined).toLaTeX() -> null   (default \frac bar)
 * @example
 * // new LineThickness('0').toLaTeX()       -> '0pt'  (bar-less)
 * @example
 * // new LineThickness('2pt').toLaTeX()     -> '2pt'  (absolute, passed through)
 * @example
 * // new LineThickness('2').toLaTeX()       -> '0.8pt' (2x the default thickness)
 */
export class LineThickness {
  private readonly _raw?: string;

  constructor(raw?: string) {
    this._raw = raw;
  }

  /**
   * @returns the LaTeX dimension to use as the fraction bar thickness, or `null`
   * to keep the default-thickness `\frac` bar.
   */
  toLaTeX(): string | null {
    if (!this._raw) return null;

    const value = this._raw.trim().toLowerCase();

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
