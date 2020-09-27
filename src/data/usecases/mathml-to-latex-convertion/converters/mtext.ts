import { ToLaTeXConverter } from '@/domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';

export class MText implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  convert(): string {
    const { attributes, value } = this._mathmlElement;

    return new TextCommand(attributes.mathvariant).apply(value);
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
