import { MathMLElement } from '../protocols/mathml-element';
import { ToLaTeXConverter } from '../../domain/usecases/to-latex-converter';
import { MathMLElementToLatexConverterAdapter } from '../usecases/mathml-to-latex-convertion/mathml-element-to-latex-converter-adapter';

// During an iterative conversion (see tree-to-latex) every child is converted
// before its parent and its LaTeX is stored in this memo. While a memo is
// active, the helper returns the child's precomputed string instead of building
// a converter that would recurse — keeping the call stack flat at any depth.
let conversionMemo: Map<MathMLElement, string> | null = null;

export const setConversionMemo = (memo: Map<MathMLElement, string> | null): Map<MathMLElement, string> | null => {
  const previous = conversionMemo;
  conversionMemo = memo;
  return previous;
};

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
