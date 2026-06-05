import { MathMLElement } from '../protocols/mathml-element';
import { ToLaTeXConverter } from '../../domain/usecases/to-latex-converter';
import { MathMLElementToLatexConverterAdapter } from '../usecases/mathml-to-latex-convertion/mathml-element-to-latex-converter-adapter';

// During an iterative conversion (see tree-to-latex) every child is converted
// before its parent and its LaTeX is stored in this memo. While a memo is
// active, the helper returns the child's precomputed string instead of building
// a converter that would recurse — keeping the call stack flat at any depth.
let conversionMemo: Map<MathMLElement, string> | null = null;

/**
 * Activates (or clears, with `null`) the memo consulted by
 * {@link mathMLElementToLaTeXConverter}.
 *
 * @param memo - the memo to make active, or `null` to disable memoization.
 * @returns the previously active memo, so callers can restore it afterwards.
 */
export const setConversionMemo = (memo: Map<MathMLElement, string> | null): Map<MathMLElement, string> | null => {
  const previous = conversionMemo;
  conversionMemo = memo;
  return previous;
};

/**
 * Resolves the {@link ToLaTeXConverter} for an element. While a memo is active
 * and already contains the element, returns a converter that yields the
 * precomputed LaTeX (no recursion); otherwise builds the real converter.
 *
 * @param mathMLElement - the element to convert.
 * @returns a converter bound to the element.
 */
export const mathMLElementToLaTeXConverter = (mathMLElement: MathMLElement): ToLaTeXConverter => {
  const precomputed = conversionMemo?.get(mathMLElement);
  if (precomputed !== undefined) return new PrecomputedConverter(precomputed);

  return new MathMLElementToLatexConverterAdapter(mathMLElement).toLatexConverter();
};

class PrecomputedConverter implements ToLaTeXConverter {
  constructor(private readonly _latex: string) {}

  convert(): string {
    return this._latex;
  }
}
