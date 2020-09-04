import { MathMLTag } from './MathMLTag';

export class GenericContentWrapperTag extends MathMLTag {
  convert(): string {
    return this._mapChildrenToLaTeX().join(' ');
  }
}
