import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { LatexSpecials } from '../../../../../syntax';
import { MI } from '../mi';
import { Character } from '../mi/character';
import { TextCommand } from './text-command';

/**
 * Converts a MathML `<mtext>` element into LaTeX.
 *
 * Keeps the content as a single text run wrapped by the `mathvariant` text
 * command: ASCII alphanumerics and spaces verbatim, LaTeX specials escaped, and
 * characters without a symbol-table mapping (accented letters, plain
 * punctuation) kept literal, since `\text{...}` renders unicode directly. Only
 * glyphs the symbol tables know (Greek letters, arrows, invisible operators)
 * leave the run and are delegated to the `<mi>` converter as math.
 *
 * @example
 * // <mtext mathvariant="bold">hi</mtext> -> \textbf{hi}
 * // <mtext>café</mtext> -> \text{café}
 * // <mtext>a_b</mtext> -> \text{a\_b}
 */
export class MText implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const { attributes, value } = this._mathmlElement;
    const textCommand = new TextCommand(attributes.mathvariant);

    return [...value]
      .map((char) => this._classify(char))
      .reduce<Run[]>((runs, run) => {
        // merge consecutive text characters into a single run
        const lastRun = runs[runs.length - 1];
        if (run.isText && lastRun && lastRun.isText) {
          lastRun.value += run.value;
          return runs;
        }

        return [...runs, run];
      }, [])
      .map((run) => (run.isText ? textCommand.apply(run.value) : this._convertSymbol(run.value)))
      .join('');
  }

  private _classify(char: string): Run {
    if (/^[a-zA-Z0-9]$/.test(char) || char === ' ') return { value: char, isText: true };
    if (LatexSpecials.isSpecial(char)) return { value: LatexSpecials.escapeForText(char), isText: true };
    if (Character.findMapping(char) !== undefined) return { value: char, isText: false };

    return { value: char, isText: true };
  }

  private _convertSymbol(value: string): string {
    return new MI({ name: 'mi', attributes: {}, children: [], value }).convert();
  }
}

type Run = {
  value: string;
  isText: boolean;
};
