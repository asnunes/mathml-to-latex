import { MathMLElement } from '../../../data/protocols/mathml-element';
import { MaxDepthExceededError } from '../../../data/errors';

// Bounds the recursive traversal so that pathologically deep input cannot
// overflow the call stack (here or on the LaTeX conversion that walks the same
// tree afterwards). Real-world MathML nesting is orders of magnitude shallower.
const MAX_DEPTH = 1000;

export class ElementsToMathMLAdapter {
  convert(els: Element[], depth = 0): MathMLElement[] {
    if (depth > MAX_DEPTH) throw new MaxDepthExceededError(MAX_DEPTH);
    return els.filter((el: Element) => el.tagName !== undefined).map((el: Element) => this._convertElement(el, depth));
  }

  private _convertElement(el: Element, depth: number): MathMLElement {
    return {
      name: el.tagName,
      attributes: this._convertElementAttributes(el.attributes),
      value: this._hasElementChild(el) ? '' : el.textContent || '',
      children: this._hasElementChild(el)
        ? this.convert(Array.from(el.childNodes) as Element[], depth + 1)
        : ([] as MathMLElement[]),
    };
  }

  private _convertElementAttributes(attributes: NamedNodeMap): Record<string, string> {
    return Array.from(attributes).reduce(
      (acc, attr: Attr) =>
        Object.assign({ [attr.nodeName]: attr.nodeValue === attr.nodeName ? '' : attr.nodeValue }, acc),
      {},
    );
  }

  private _hasElementChild(el: Element): boolean {
    const childNodes = el.childNodes;
    return !!childNodes && childNodes.length !== 0 && this._isThereAnyNoTextNode(childNodes);
  }

  private _isThereAnyNoTextNode(children: NodeListOf<ChildNode>): boolean {
    return Array.from(children).some((child) => child.nodeName !== '#text');
  }
}
