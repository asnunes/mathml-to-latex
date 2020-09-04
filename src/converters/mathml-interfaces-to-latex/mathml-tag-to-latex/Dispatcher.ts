import {
  Math,
  MathMLTag,
  MI,
  MO,
  MN,
  MSqrt,
  MSup,
  MFenced,
  MFrac,
  MRoot,
  GenericContentWrapperTag,
} from './mathml-tags';

export class Dispatcher {
  private _name: string;
  private _value: string;
  private _attributes: Record<string, string>;
  private _children: MathMLTag[];

  constructor(name: string, value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    this._name = name;
    this._value = value;
    this._attributes = attributes;
    this._children = children;
  }

  dispatch(): MathMLTag {
    switch (this._name) {
      case 'math':
        return new Math(this._value, this._attributes, this._children);
      case 'mi':
        return new MI(this._value, this._attributes, this._children);
      case 'mo':
        return new MO(this._value, this._attributes, this._children);
      case 'mn':
        return new MN(this._value, this._attributes, this._children);
      case 'msqrt':
        return new MSqrt(this._value, this._attributes, this._children);
      case 'msup':
        return new MSup(this._value, this._attributes, this._children);
      case 'mfenced':
        return new MFenced(this._value, this._attributes, this._children);
      case 'mfrac':
        return new MFrac(this._value, this._attributes, this._children);
      case 'mroot':
        return new MRoot(this._value, this._attributes, this._children);
      case 'mrow':
      case 'mpadded':
        return new GenericContentWrapperTag(this._name, this._value, this._attributes, this._children);
      default:
        return new MathMLTag(this._name, this._value, this._attributes, this._children);
    }
  }
}
