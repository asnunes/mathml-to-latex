import { MathML } from '../../interfaces/MathML';

export class ElementsToMathMLInterfacesConvertor {
  convert(els: Element[]): MathML[] {
    return els.filter((el: Element) => el.tagName !== undefined).map((el: Element) => this._convertElement(el));
  }

  private _convertElement(el: Element): MathML {
    return {
      name: el.tagName,
      attributes: el.attributes ? this._convertElementAttributes(el.attributes) : {},
      value: this._hasChild(el) ? '' : el.textContent || '',
      children: this._hasChild(el) ? this.convert(Array.from(el.childNodes) as Element[]) : ([] as MathML[]),
    };
  }

  private _convertElementAttributes(attributes: NamedNodeMap): Record<string, string> {
    return Array.from(attributes).reduce(
      (acc, attr: Attr) => Object.assign({ [attr.nodeName]: attr.nodeValue }, acc),
      {},
    );
  }

  private _hasChild(el: Element): boolean {
    return !!el.childNodes && el.childNodes.length !== 0;
  }
}
