import { MathMLElement } from '../../../data/protocols/mathml-element';

export class ElementsToMathMLAdapter {
  convert(els: Element[]): MathMLElement[] {
    const result: MathMLElement[] = [];
    // Iterative depth-first build with an explicit stack, so deeply nested
    // markup cannot overflow the call stack. Each node is linked into its
    // parent's `children` array by reference; children are pushed in reverse so
    // they are appended in document order.
    const stack: { el: Element; target: MathMLElement[] }[] = [];
    for (let i = els.length - 1; i >= 0; i--) stack.push({ el: els[i], target: result });

    while (stack.length > 0) {
      const { el, target } = stack.pop() as { el: Element; target: MathMLElement[] };
      if (el.tagName === undefined) continue;

      const node = this._convertElement(el);
      target.push(node);

      if (!this._hasElementChild(el)) continue;
      const children = Array.from(el.childNodes) as Element[];
      for (let i = children.length - 1; i >= 0; i--) stack.push({ el: children[i], target: node.children });
    }

    return result;
  }

  private _convertElement(el: Element): MathMLElement {
    return {
      name: el.tagName,
      attributes: this._convertElementAttributes(el.attributes),
      value: this._hasElementChild(el) ? '' : el.textContent || '',
      children: [],
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
