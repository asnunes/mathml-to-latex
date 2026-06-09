declare global {
  interface Window {
    // Holds the config object before the bundle loads and the MathJax runtime after.
    MathJax: unknown;
  }
}

/** The slice of the MathJax runtime API the renderer relies on. */
interface MathJaxRuntime {
  tex2svg(tex: string, options: { display: boolean }): HTMLElement;
  mathml2svg(mathml: string, options: { display: boolean }): HTMLElement;
  startup: { promise: Promise<void>; document: { clear(): void; updateDocument(): void } };
}

/**
 * Thin wrapper around MathJax used for both panes of the comparison: the
 * MathML side (`mml` input) and the LaTeX side (`tex` input). Using the same
 * engine on both sides keeps the comparison fair: a visual difference means a
 * conversion difference, not a renderer difference.
 *
 * The SVG output is used instead of CHTML so no webfont loading is involved,
 * which keeps rendering deterministic (and screenshot-friendly later).
 */
export class MathRenderer {
  private readonly _ready: Promise<void>;

  constructor() {
    window.MathJax = {
      startup: { typeset: false },
      // Menu and assistive features are off: the a11y speech worker does not
      // resolve under Vite's bundling and adds nothing to a comparison tool.
      options: {
        enableMenu: false,
        enableEnrichment: false,
        enableSpeech: false,
        enableBraille: false,
        a11y: { speech: false, braille: false },
        menuOptions: { settings: { speech: false, braille: false, enrich: false } },
      },
    };
    this._ready = import('mathjax/tex-mml-svg.js').then(() => this._mathjax.startup.promise);
  }

  /** Renders a LaTeX string into the target element. Throws on parse failure. */
  async renderTeX(tex: string, target: HTMLElement): Promise<void> {
    await this._ready;
    this._replace(target, this._mathjax.tex2svg(tex, { display: true }));
  }

  /** Renders a MathML string into the target element. Throws on parse failure. */
  async renderMathML(mathml: string, target: HTMLElement): Promise<void> {
    await this._ready;
    this._replace(target, this._mathjax.mathml2svg(mathml, { display: true }));
  }

  private _replace(target: HTMLElement, rendered: HTMLElement): void {
    target.replaceChildren(rendered);
    this._mathjax.startup.document.clear();
    this._mathjax.startup.document.updateDocument();
  }

  private get _mathjax(): MathJaxRuntime {
    return window.MathJax as MathJaxRuntime;
  }
}
