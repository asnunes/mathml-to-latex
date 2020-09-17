import { MathMLTag } from './MathMLTag';

export class MText extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mtext', value, attributes, children);
  }

  convert(): string {
    const textCommand = new TextCommand(this._attributes.mathvariant);

    return textCommand.apply(this._value);
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
      default:
        return ['\\text'];
    }
  }
}
