/**
 * Escapes the LaTeX special characters (`# $ % & _ { } ~ ^ \`) in plain text
 * that reaches the output without a lookup-table mapping, so they render as
 * literal glyphs instead of acting as LaTeX syntax (macro parameter, math
 * shift, alignment, subscript/superscript, grouping). Tilde, circumflex and
 * backslash have no universal escape: math mode and `\text{...}` accept
 * different commands, hence the two maps.
 */
export class LatexSpecials {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  /** Escapes the value for math mode (`\sim`, `\hat{}`, `\backslash`). */
  static escapeForMath(value: string): string {
    return new LatexSpecials(value)._escape(mathModeEscapes);
  }

  /** Escapes the value for text mode, i.e. inside `\text{...}` and its variants. */
  static escapeForText(value: string): string {
    return new LatexSpecials(value)._escape(textModeEscapes);
  }

  /** Whether the single character is LaTeX syntax that needs escaping. */
  static isSpecial(char: string): boolean {
    return Object.prototype.hasOwnProperty.call(textModeEscapes, char);
  }

  private _escape(escapes: Record<string, string>): string {
    return [...this._value]
      .map((char) => (Object.prototype.hasOwnProperty.call(escapes, char) ? escapes[char] : char))
      .join('');
  }
}

const sharedEscapes: Record<string, string> = {
  '#': '\\#',
  $: '\\$',
  '%': '\\%',
  '&': '\\&',
  _: '\\_',
  '{': '\\{',
  '}': '\\}',
};

// The `{}` terminator keeps the command from swallowing a following letter
// (`a~b` must not become the undefined `\simb`).
const mathModeEscapes: Record<string, string> = {
  ...sharedEscapes,
  '~': '\\sim{}',
  '^': '\\hat{}',
  '\\': '\\backslash{}',
};

const textModeEscapes: Record<string, string> = {
  ...sharedEscapes,
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
  '\\': '\\textbackslash{}',
};
