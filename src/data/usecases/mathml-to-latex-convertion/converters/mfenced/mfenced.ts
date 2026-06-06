import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../../helpers/mathml-element-to-latex-converter';
import { Vector } from './vector';
import { Matrix } from './matrix';

/**
 * Converts a MathML `<mfenced>` element into LaTeX delimited content.
 *
 * Children are converted and either wrapped as a matrix (when a descendant
 * `<mtable>` is present, picking the environment from the open/close fences) or
 * joined with the `separators`/`open`/`close` attributes as a delimited vector.
 *
 * @example
 * // <mfenced open="(" close=")"><mi>a</mi><mi>b</mi></mfenced> -> \left(a,b\right)
 */
export class MFenced implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;
  private readonly open: string;
  private readonly close: string;

  constructor(mathmlElement: MathMLElement) {
    this._mathmlElement = mathmlElement;
    this.open = this._mathmlElement.attributes.open || '';
    this.close = this._mathmlElement.attributes.close || '';
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const latexChildren = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert());

    if (this._isThereRelativeOfName(this._mathmlElement.children, 'mtable'))
      return new Matrix(this.open, this.close).apply(latexChildren);

    const separatorsAttr = this._mathmlElement.attributes.separators;
    const hasSeparatorsAttribute = separatorsAttr !== undefined;
    const separatorsArray = separatorsAttr ? Array.from(separatorsAttr) : [];

    // Use comma default only if no separators **attribute** was provided
    const defaultSeparator = !hasSeparatorsAttribute ? ',' : '';
    return new Vector(this.open, this.close, separatorsArray, defaultSeparator).apply(latexChildren);
  }

  /** Depth-first searches the subtree for any descendant element with the given name. */
  private _isThereRelativeOfName(mathmlElements: MathMLElement[], elementName: string): boolean {
    // Iterative depth-first search so a deeply nested subtree cannot overflow
    // the call stack.
    const stack = [...mathmlElements];

    while (stack.length > 0) {
      const element = stack.pop() as MathMLElement;
      if (element.name === elementName) return true;
      stack.push(...(element.children ?? []));
    }

    return false;
  }
}
