import { MathMLTag } from './MathMLTag';

export class MTable extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mtable', value, attributes, children);
  }

  convert(): string {
    return this._mapChildrenToLaTeX().join(' \\\\\n');
  }
}
