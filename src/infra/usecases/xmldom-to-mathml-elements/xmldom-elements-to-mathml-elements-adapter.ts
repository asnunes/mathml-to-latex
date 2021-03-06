import { MathMLElement } from '../../../data/protocols/mathml-element';

export class ElementsToMathMLAdapter {
  convert(els: Element[]): MathMLElement[] {
    return els.filter((el: Element) => el.tagName !== undefined).map((el: Element) => this._convertElement(el));
  }

  private _convertElement(el: Element): MathMLElement {
    return {
      name: el.tagName,
      attributes: this._convertElementAttributes(el.attributes),
      value: this._hasElementChild(el) ? '' : el.textContent || '',
      children: this._hasElementChild(el)
        ? this.convert(Array.from(el.childNodes) as Element[])
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
