import { ToLaTeXConverter } from '@/domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter, ParenthesisWrapper, BracketWrapper } from '../../../helpers';
import { InvalidNumberOfChild } from '../../../errors';

export class MSubsup implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 3) throw new InvalidNumberOfChild(name, 3, childrenLength);

    const base = mathMLElementToLaTeXConverter(children[0]).convert();
    const sub = mathMLElementToLaTeXConverter(children[1]).convert();
    const sup = mathMLElementToLaTeXConverter(children[2]).convert();

    const wrappedSub = new BracketWrapper().wrap(sub);
    const wrappedSup = new BracketWrapper().wrap(sup);

    return `${this._wrapInParenthesisIfThereIsSpace(base)}_${wrappedSub}^${wrappedSup}`;
  }

  private _wrapInParenthesisIfThereIsSpace(str: string): string {
    if (!str.match(/\s+/g)) return str;
    return new ParenthesisWrapper().wrap(str);
  }
}
