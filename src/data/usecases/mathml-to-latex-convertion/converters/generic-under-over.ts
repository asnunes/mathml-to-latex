import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers/mathml-element-to-latex-converter';
import { InvalidNumberOfChildrenError } from '../../../errors';
import { latexAccents } from '../../../../syntax/latex-accents';

export class GenericUnderOver implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 2) throw new InvalidNumberOfChildrenError(name, 2, childrenLength);

    const content = mathMLElementToLaTeXConverter(children[0]).convert();
    const accent = mathMLElementToLaTeXConverter(children[1]).convert();

    return this._applyCommand(content, accent);
  }

  private _applyCommand(content: string, accent: string): string {
    const type = this._mathmlElement.name.match(/under/) ? TagTypes.Under : TagTypes.Over;
    return new UnderOverSetter(type).apply(content, accent);
  }
}

class UnderOverSetter {
  private readonly _type;

  constructor(type: TagTypes) {
    this._type = type;
  }

  apply(content: string, accent: string) {
    return latexAccents.includes(accent) ? `${accent}{${content}}` : `${this._defaultCommand}{${accent}}{${content}}`;
  }

  private get _defaultCommand(): string {
    if (this._type === TagTypes.Under) return '\\underset';
    return '\\overset';
  }
}

enum TagTypes {
  Under,
  Over,
}
