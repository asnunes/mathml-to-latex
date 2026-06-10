import { Wrapper } from './wrapper';
import { doubleBarFenceGlyphs } from '../../../syntax';

/**
 * Wraps a string with auto-sizing LaTeX delimiters, prefixing the given
 * open/close characters with `\left` and `\right` (e.g. `\left( ... \right)`).
 */
export class GenericWrapper {
  protected _open: string;
  protected _close: string;

  constructor(open: string, close: string) {
    this._open = '\\left' + this._toLatexDelimiter(open);
    this._close = '\\right' + this._toLatexDelimiter(close);
  }

  /** @returns `str` wrapped in `\left`/`\right` delimiters. */
  wrap(str: string): string {
    return new Wrapper(this._open, this._close).wrap(str);
  }

  /** Maps a MathML fence character to its valid `\left`/`\right` delimiter form. */
  private _toLatexDelimiter(delimiter: string): string {
    return DELIMITER_TRANSLATIONS.get(delimiter) ?? delimiter;
  }
}

/**
 * MathML fence characters that are not valid `\left`/`\right` delimiters as-is:
 * braces are grouping characters (need `\{`/`\}`) and the double-bar family
 * is the norm delimiter `\|` (a bare `\left||` is a stretchy bar followed by a
 * literal one, and the unicode glyphs are not delimiters LaTeX knows at all,
 * as in issue #43).
 */
const DELIMITER_TRANSLATIONS = new Map([
  ['{', '\\{'],
  ['}', '\\}'],
  ...[...doubleBarFenceGlyphs].map((glyph): [string, string] => [glyph, '\\|']),
]);
