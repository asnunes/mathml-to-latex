import * as MathMLTags from './mathml-tags';

export class Dispatcher {
  private _name: string;
  private _value: string;
  private _attributes: Record<string, string>;
  private _children: MathMLTags.MathMLTag[];

  constructor(name: string, value: string, attributes: Record<string, string>, children: MathMLTags.MathMLTag[]) {
    this._name = name;
    this._value = value;
    this._attributes = attributes;
    this._children = children;
  }

  dispatch(): MathMLTags.MathMLTag {
    switch (this._name) {
      case 'math':
        return new MathMLTags.Math(this._value, this._attributes, this._children);
      case 'mi':
        return new MathMLTags.MI(this._value, this._attributes, this._children);
      case 'mo':
        return new MathMLTags.MO(this._value, this._attributes, this._children);
      case 'mn':
        return new MathMLTags.MN(this._value, this._attributes, this._children);
      case 'msqrt':
        return new MathMLTags.MSqrt(this._value, this._attributes, this._children);
      case 'mfenced':
        return new MathMLTags.MFenced(this._value, this._attributes, this._children);
      case 'mfrac':
        return new MathMLTags.MFrac(this._value, this._attributes, this._children);
      case 'mroot':
        return new MathMLTags.MRoot(this._value, this._attributes, this._children);
      case 'maction':
        return new MathMLTags.MAction(this._value, this._attributes, this._children);
      case 'menclose':
        return new MathMLTags.MEnclose(this._value, this._attributes, this._children);
      case 'merror':
        return new MathMLTags.MError(this._value, this._attributes, this._children);
      case 'mphantom':
        return new MathMLTags.MPhantom(this._value, this._attributes, this._children);
      case 'msup':
        return new MathMLTags.MSup(this._value, this._attributes, this._children);
      case 'msub':
        return new MathMLTags.MSub(this._value, this._attributes, this._children);
      case 'msubsup':
        return new MathMLTags.MSubsup(this._value, this._attributes, this._children);
      case 'mmultiscripts':
        return new MathMLTags.MMultiscripts(this._value, this._attributes, this._children);
      case 'mtext':
        return new MathMLTags.MText(this._value, this._attributes, this._children);
      case 'munderover':
        return new MathMLTags.MUnderover(this._value, this._attributes, this._children);
      case 'mtable':
        return new MathMLTags.MTable(this._value, this._attributes, this._children);
      case 'mtr':
        return new MathMLTags.MTr(this._value, this._attributes, this._children);
      case 'mover':
      case 'munder':
        return new MathMLTags.GenericUnderOverTag(this._name, this._value, this._attributes, this._children);
      case 'mrow':
      case 'mpadded':
        return new MathMLTags.GenericContentWrapperTag(this._name, this._value, this._attributes, this._children);
      default:
        return new MathMLTags.MathMLTag(this._name, this._value, this._attributes, this._children);
    }
  }
}
