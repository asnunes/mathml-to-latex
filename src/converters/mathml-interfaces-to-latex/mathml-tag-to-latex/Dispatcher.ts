import {
  Math,
  MathMLTag,
  MI,
  MO,
  MN,
  MSqrt,
  MFenced,
  MFrac,
  MRoot,
  GenericContentWrapperTag,
  MAction,
  MEnclose,
  MError,
  MOver,
  MPhantom,
  MSup,
  MSub,
  MSubsup,
  MText,
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
      case 'mfenced':
        return new MFenced(this._value, this._attributes, this._children);
      case 'mfrac':
        return new MFrac(this._value, this._attributes, this._children);
      case 'mroot':
        return new MRoot(this._value, this._attributes, this._children);
      case 'maction':
        return new MAction(this._value, this._attributes, this._children);
      case 'menclose':
        return new MEnclose(this._value, this._attributes, this._children);
      case 'merror':
        return new MError(this._value, this._attributes, this._children);
      case 'mover':
        return new MOver(this._value, this._attributes, this._children);
      case 'mphantom':
        return new MPhantom(this._value, this._attributes, this._children);
      case 'msup':
        return new MSup(this._value, this._attributes, this._children);
      case 'msub':
        return new MSub(this._value, this._attributes, this._children);
      case 'msubsup':
        return new MSubsup(this._value, this._attributes, this._children);
      case 'mtext':
        return new MText(this._value, this._attributes, this._children);
      case 'mrow':
      case 'mpadded':
        return new GenericContentWrapperTag(this._name, this._value, this._attributes, this._children);
      default:
        return new MathMLTag(this._name, this._value, this._attributes, this._children);
    }
  }
}
