import { MathML } from '../../interfaces/MathML';
import Dispatcher from './mathml-tag-to-latex';
import { MathMLTag } from './mathml-tag-to-latex/mathml-tags';

export class MathMLInterfacesToLaTeX {
  constructor(private _mathMLInterfaces: MathML[]) {
    this._mathMLInterfaces = _mathMLInterfaces;
  }

  convert(): string {
    return this._mathMLInterfaces.map((mathml) => this._dispatch(mathml).convert()).join('');
  }

  private _dispatch(mathml: MathML): MathMLTag {
    const { name, value, attributes } = mathml;
    const children = mathml.children.map((children) => this._dispatch(children));

    return new Dispatcher(name, value, attributes, children).dispatch();
  }
}
