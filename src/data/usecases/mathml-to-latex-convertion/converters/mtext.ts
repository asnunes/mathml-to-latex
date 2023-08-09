import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { MI } from './mi';

export class MText implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

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

class TextCommand {
  private readonly _mathvariant: string;

  constructor(mathvariant: string | undefined) {
    this._mathvariant = mathvariant || 'normal';
  }

  apply(value: string) {
    return this._commands.reduce((acc, command, index) => {
      if (index === 0) return `${command}{${value}}`;
      return `${command}{${acc}}`;
    }, '');
  }

  private get _commands(): string[] {
    switch (this._mathvariant) {
      case 'bold':
        return ['\\textbf'];
      case 'italic':
        return ['\\textit'];
      case 'bold-italic':
        return ['\\textit', '\\textbf'];
      case 'double-struck':
        return ['\\mathbb'];
      case 'monospace':
        return ['\\mathtt'];
      case 'bold-fraktur':
      case 'fraktur':
        return ['\\mathfrak'];
      default:
        return ['\\text'];
    }
  }
}

type Char = {
  value: string;
  isAlphanumeric: boolean;
};
