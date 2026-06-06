import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { MI } from '../mi';
import { TextCommand } from './text-command';

/**
 * Converts a MathML `<mtext>` element into LaTeX.
 *
 * Splits the text into runs of alphanumeric/space characters and standalone
 * symbols: alphanumeric runs are wrapped by the `mathvariant` text command while
 * each symbol is delegated to the `<mi>` converter.
 *
 * @example
 * // <mtext mathvariant="bold">hi</mtext> -> \textbf{hi}
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

    return [...value]
      .map<Char>((char) => {
        // if is a letter, number or space, return it
        if (/^[a-zA-Z0-9]$/.test(char) || char === ' ')
          return {
            value: char,
            isAlphanumeric: true,
          };

        // if is a symbol, set it to mi parser
        return {
          value: char,
          isAlphanumeric: false,
        };
      })
      .reduce<Char[]>((acc, char) => {
        // merge consecutive alphanumeric characters
        if (char.isAlphanumeric) {
          const lastChar = acc[acc.length - 1];
          if (lastChar && lastChar.isAlphanumeric) {
            lastChar.value += char.value;
            return acc;
          }
        }

        return [...acc, char];
      }, [])
      .map((char) => {
        if (!char.isAlphanumeric) {
          return new MI({
            name: 'mi',
            attributes: {},
            children: [],
            value: char.value,
          }).convert();
        }

        return new TextCommand(attributes.mathvariant).apply(char.value);
      })
      .join('');
  }
}

type Char = {
  value: string;
  isAlphanumeric: boolean;
};
