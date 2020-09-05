import { MathMLTag } from './MathMLTag';

export class MEnclose extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('menclose', value, attributes, children);
  }

  convert(): string {
    const latexJoinedChildren = this._mapChildrenToLaTeX().join(' ');

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

  private get _notation(): string {
    if (!this._attributes.notation) return 'longdiv';

    return this._attributes.notation;
  }
}
