import { MathMLTag } from './MathMLTag';

export class MAction extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('maction', value, attributes, children);
  }

  convert(): string {
    if (this._isToggle) return this._mapChildrenToLaTeX().join(' \\Longrightarrow ');
    return this._mapChildrenToLaTeX()[0];
  }

  private get _isToggle(): boolean {
    return this._attributes.actiontype === 'toggle' || !this._attributes.actiontype;
  }
}
