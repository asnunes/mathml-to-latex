import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

/**
 * Converts a MathML `<mroot>` element into a LaTeX n-th root.
 *
 * Converts the first child as the radicand and the second child as the index,
 * producing `\sqrt[index]{content}`.
 *
 * @example
 * // <mroot><mn>8</mn><mn>3</mn></mroot> -> \sqrt[3]{8}
 */
export class MRoot implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   * @throws {InvalidNumberOfChildrenError} if the element does not have exactly 2 children.
   */
  convert(): string {
    const { name, children } = this._mathmlElement;
    const childrenLength = children.length;

    if (childrenLength !== 2) throw new InvalidNumberOfChildrenError(name, 2, childrenLength);

    const content = mathMLElementToLaTeXConverter(children[0]).convert();
    const rootIndex = mathMLElementToLaTeXConverter(children[1]).convert();

    return `\\sqrt[${rootIndex}]{${content}}`;
  }
}
