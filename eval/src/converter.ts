import { MathMLToLaTeX } from 'mathml-to-latex';

export interface ConversionResult {
  latex: string;
  error: string | null;
}

/**
 * Wraps the library under test (imported straight from `../src`, i.e. the
 * current working tree) and turns converter exceptions into data the UI can
 * display instead of letting them break the render loop.
 */
export class Converter {
  convert(mathml: string): ConversionResult {
    try {
      return { latex: MathMLToLaTeX.convert(mathml), error: null };
    } catch (error) {
      return { latex: '', error: (error as Error).message };
    }
  }
}
