import { MathMLElement } from '../../data/protocols/mathml-element';

/**
 * Common contract implemented by every element converter: turn the wrapped
 * MathML element into a LaTeX string.
 */
export interface ToLaTeXConverter {
  /** @returns the LaTeX representation of the wrapped element. */
  convert(): string;
}

/**
 * Constructor signature of a {@link ToLaTeXConverter}, used by the dispatcher to
 * instantiate the right converter for a given MathML element.
 */
export interface ToLaTeXConverterClass {
  new (mathMLElement: MathMLElement): ToLaTeXConverter;
}
