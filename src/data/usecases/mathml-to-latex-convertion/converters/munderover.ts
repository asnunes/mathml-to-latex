import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

/**
 * Converts a MathML `<munderover>` element into LaTeX under/over scripts.
 *
 * Converts the three children as base, under-content and over-content,
 * producing `base_{under}^{over}`.
 *
 * @example
 * // <munderover><mo>∑</mo><mi>i</mi><mi>n</mi></munderover> -> \sum_{i}^{n}
 */
export class MUnderover implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   * @throws {InvalidNumberOfChildrenError} if the element does not have exactly 3 children.
   */
  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 3) throw new InvalidNumberOfChildrenError(name, 3, childrenLength);

    const base = mathMLElementToLaTeXConverter(children[0]).convert();
    const underContent = mathMLElementToLaTeXConverter(children[1]).convert();
    const overContent = mathMLElementToLaTeXConverter(children[2]).convert();

    return `${base}_{${underContent}}^{${overContent}}`;
  }
}
