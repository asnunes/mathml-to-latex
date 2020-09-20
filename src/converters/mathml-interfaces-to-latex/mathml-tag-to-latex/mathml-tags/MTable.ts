import { MathMLTag } from './MathMLTag';

export class MTable extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mtable', value, attributes, children);
    this.addFlagRecursiveIfClassName(this.constructor.name, 'innerTable');
  }

  convert(): string {
    const tableContent = this._mapChildrenToLaTeX().join(' \\\\\n');
    return this.hasFlag('innerTable') ? this._wrap(tableContent) : tableContent;
  }

  private _wrap(latex: string): string {
    return `\\begin{matrix}${latex}\\end{matrix}`;
  }
}
