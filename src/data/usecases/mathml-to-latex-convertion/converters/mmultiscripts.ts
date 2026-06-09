import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';
import { InvalidNumberOfChildrenError } from '../../../errors';

/**
 * Converts a MathML `<mmultiscripts>` element into LaTeX.
 *
 * Parses the structure the spec defines, `base (sub sup)* [mprescripts
 * (presub presup)*]`, accepting the `<mprescripts/>` marker at any position:
 * every prescript pair is emitted as `{}_{sub}^{sup}` before the base and
 * every postscript pair after it, with `{}` atoms separating consecutive
 * pairs so multiple pairs never produce a LaTeX double-subscript error.
 * `<none/>` placeholders and missing trailing scripts are omitted instead of
 * emitting empty `_{}`/`^{}`.
 *
 * @example
 * // <mmultiscripts><mi>X</mi><mprescripts/><mn>1</mn><mn>2</mn></mmultiscripts> -> {}_{1}^{2}X
 * @example
 * // <mmultiscripts><mi>F</mi><mn>1</mn><mn>2</mn><mn>3</mn><mn>4</mn></mmultiscripts> -> F_{1}^{2}{}_{3}^{4}
 */
export class MMultiscripts implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   * @throws {InvalidNumberOfChildrenError} when the base child is missing.
   */
  convert(): string {
    const { name, children } = this._mathmlElement;
    if (children.length === 0) throw new InvalidNumberOfChildrenError(name, 1, 0, 'at least');

    const base = this._baseLatex(children[0]);
    const { prescripts, postscripts } = this._splitScripts(children.slice(1));

    return this._pairsLatex(prescripts, true) + base + this._pairsLatex(postscripts, false);
  }

  /**
   * Converts the base, grouping a multi-token result with braces so the
   * scripts attach to all of it (and never collide with the base's own
   * scripts, e.g. a `msub` base). An empty base becomes an empty atom so the
   * surrounding scripts still have something valid to attach to.
   */
  private _baseLatex(base: MathMLElement): string {
    const latex = mathMLElementToLaTeXConverter(base).convert();
    if (latex === '') return '{}';
    return latex.length === 1 ? latex : `{${latex}}`;
  }

  /** Splits the script children at the `<mprescripts/>` marker, wherever it is. */
  private _splitScripts(scripts: MathMLElement[]): { prescripts: ScriptPair[]; postscripts: ScriptPair[] } {
    const markerIndex = scripts.findIndex((child) => child.name === 'mprescripts');
    const postscripts = markerIndex === -1 ? scripts : scripts.slice(0, markerIndex);
    const prescripts = markerIndex === -1 ? [] : scripts.slice(markerIndex + 1);

    return { prescripts: this._toPairs(prescripts), postscripts: this._toPairs(postscripts) };
  }

  private _toPairs(elements: MathMLElement[]): ScriptPair[] {
    const pairs: ScriptPair[] = [];
    for (let i = 0; i < elements.length; i += 2) {
      pairs.push({ sub: this._scriptLatex(elements[i]), sup: this._scriptLatex(elements[i + 1]) });
    }
    return pairs;
  }

  /** `<none/>` placeholders and missing trailing scripts become empty scripts. */
  private _scriptLatex(element: MathMLElement | undefined): string {
    if (element === undefined || element.name === 'none') return '';
    return mathMLElementToLaTeXConverter(element).convert();
  }

  /**
   * Renders the pairs. Prescript pairs always hang off their own empty `{}`
   * atom; the first postscript pair attaches straight to the base and every
   * following pair gets a `{}` atom, which is what prevents double-subscript
   * errors. Fully empty pairs have no LaTeX representation and are skipped.
   */
  private _pairsLatex(pairs: ScriptPair[], isPrescript: boolean): string {
    let latex = '';
    let attachesToBase = !isPrescript;

    for (const pair of pairs) {
      const scripts = (pair.sub ? `_{${pair.sub}}` : '') + (pair.sup ? `^{${pair.sup}}` : '');
      if (scripts === '') continue;

      latex += (attachesToBase ? '' : '{}') + scripts;
      attachesToBase = false;
    }

    return latex;
  }
}

/** One (subscript, superscript) column of the scripts list, already converted. */
interface ScriptPair {
  sub: string;
  sup: string;
}
