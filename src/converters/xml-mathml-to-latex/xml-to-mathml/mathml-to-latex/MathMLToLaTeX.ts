import { MathML } from '../../../../protocols/MathML';
import Dispatcher from './mathml-to-latex';
import { MathMLTag } from './mathml-to-latex/mathml-tags';

export class MathMLToLaTeX {
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
