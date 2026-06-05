import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';

/**
 * Converts a MathML `<menclose>` element into LaTeX.
 *
 * Recursively converts its children and wraps them in the LaTeX construct that
 * matches the `notation` attribute (e.g. radical, box, strike), defaulting to a
 * long-division style overline when `notation` is absent or unrecognized.
 *
 * @example
 * // <menclose notation="radical"><mi>x</mi></menclose> -> \sqrt{x}
 */
export class MEnclose implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const latexJoinedChildren = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' ');

    if (this._notation === 'actuarial') return `\\overline{\\left.${latexJoinedChildren}\\right|}`;
    if (this._notation === 'radical') return `\\sqrt{${latexJoinedChildren}}`;
    if (['box', 'roundedbox', 'circle'].includes(this._notation)) return `\\boxed{${latexJoinedChildren}}`;
    if (this._notation === 'left') return `\\left|${latexJoinedChildren}`;
    if (this._notation === 'right') return `${latexJoinedChildren}\\right|`;
    if (this._notation === 'top') return `\\overline{${latexJoinedChildren}}`;
    if (this._notation === 'bottom') return `\\underline{${latexJoinedChildren}}`;
    if (this._notation === 'updiagonalstrike') return `\\cancel{${latexJoinedChildren}}`;
    if (this._notation === 'downdiagonalstrike') return `\\bcancel{${latexJoinedChildren}}`;
    if (this._notation === 'updiagonalarrow') return `\\cancelto{}{${latexJoinedChildren}}`;
    if (['verticalstrike', 'horizontalstrike'].includes(this._notation)) return `\\hcancel{${latexJoinedChildren}}`;
    if (this._notation === 'madruwb') return `\\underline{${latexJoinedChildren}\\right|}`;
    if (this._notation === 'phasorangle') return `{\\angle \\underline{${latexJoinedChildren}}}`;

    return `\\overline{\\left.\\right)${latexJoinedChildren}}`;
  }

  /** Returns the `notation` attribute, defaulting to 'longdiv'. */
  private get _notation(): string {
    return this._mathmlElement.attributes.notation || 'longdiv';
  }
}
