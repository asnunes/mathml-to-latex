import { Converter } from './converter';
import { LatexValidator } from './latex-validator';
import { MathRenderer } from './math-renderer';
import { Permalink, PlaygroundMode } from './permalink';

const DEFAULT_MATHML = `<math display="block">
  <mtable displaystyle="true" columnalign="right left">
    <mtr>
      <mtd><msub><mi>a</mi><mn>1</mn></msub></mtd>
      <mtd><mo>=</mo><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub><mi>c</mi><mn>1</mn></msub></mtd>
    </mtr>
    <mtr>
      <mtd><msub><mi>a</mi><mn>2</mn></msub></mtd>
      <mtd><mo>=</mo><msub><mi>b</mi><mn>2</mn></msub><mo>+</mo><msub><mi>c</mi><mn>2</mn></msub></mtd>
    </mtr>
  </mtable>
</math>`;

const DEFAULT_LATEX =
  '{}_{92}^{238}\\mathrm{U} \\quad \\frac{1}{2} \\quad \\begin{aligned}a &= b \\\\ c &= d\\end{aligned}';

const DEBOUNCE_MS = 300;

/**
 * Wires the two playground modes:
 *
 * - `convert`: MathML in, library LaTeX out, both rendered side by side with
 *   the same MathJax engine, plus the KaTeX validity verdict on the output;
 * - `free`: arbitrary LaTeX in, rendered directly, for checking a rendering
 *   hypothesis without going through the converter.
 *
 * Inputs are persisted in the URL hash as a shareable permalink.
 */
export class Playground {
  private readonly _converter = new Converter();
  private readonly _validator = new LatexValidator();
  private readonly _renderer = new MathRenderer();
  private readonly _permalink = new Permalink();

  private _mode: PlaygroundMode = 'convert';
  private _debounceTimer: number | undefined;

  start(): void {
    const initial = this._permalink.read();
    this._mathmlInput().value = initial?.mode === 'convert' ? initial.input : DEFAULT_MATHML;
    this._freeInput().value = initial?.mode === 'free' ? initial.input : DEFAULT_LATEX;

    this._wireModeToggle();
    this._wireInputs();
    this._wireCopyButton();

    this._switchMode(initial?.mode ?? 'convert');
  }

  private _wireModeToggle(): void {
    for (const button of document.querySelectorAll<HTMLButtonElement>('#mode-toggle button')) {
      button.addEventListener('click', () => this._switchMode(button.dataset.mode as PlaygroundMode));
    }
  }

  private _wireInputs(): void {
    this._mathmlInput().addEventListener('input', () => this._scheduleUpdate());
    this._freeInput().addEventListener('input', () => this._scheduleUpdate());
  }

  private _wireCopyButton(): void {
    const button = document.querySelector<HTMLButtonElement>('#copy-latex')!;
    button.addEventListener('click', () => {
      void navigator.clipboard.writeText(this._latexOutput().textContent ?? '');
      button.textContent = 'copied!';
      window.setTimeout(() => (button.textContent = 'copy'), 1200);
    });
  }

  private _switchMode(mode: PlaygroundMode): void {
    this._mode = mode;
    for (const button of document.querySelectorAll<HTMLButtonElement>('#mode-toggle button')) {
      button.classList.toggle('active', button.dataset.mode === mode);
    }
    document.getElementById('convert-mode')!.classList.toggle('hidden', mode !== 'convert');
    document.getElementById('free-mode')!.classList.toggle('hidden', mode !== 'free');
    void this._update();
  }

  private _scheduleUpdate(): void {
    window.clearTimeout(this._debounceTimer);
    this._debounceTimer = window.setTimeout(() => void this._update(), DEBOUNCE_MS);
  }

  private async _update(): Promise<void> {
    const input = this._mode === 'convert' ? this._mathmlInput().value : this._freeInput().value;
    this._permalink.write({ mode: this._mode, input });

    if (this._mode === 'convert') await this._updateConvertMode(input);
    else await this._updateFreeMode(input);
  }

  private async _updateConvertMode(mathml: string): Promise<void> {
    const { latex, error } = this._converter.convert(mathml);

    this._setMessage('convert-error', error, 'error');
    this._latexOutput().textContent = latex;
    this._setValidity('katex-status', latex);

    await this._renderInto('mathml-render', 'mathml-render-error', () =>
      this._renderer.renderMathML(mathml, document.getElementById('mathml-render')!),
    );
    await this._renderInto('latex-render', null, () =>
      this._renderer.renderTeX(latex, document.getElementById('latex-render')!),
    );
  }

  private async _updateFreeMode(latex: string): Promise<void> {
    this._setValidity('free-katex-status', latex);
    await this._renderInto('free-render', null, () =>
      this._renderer.renderTeX(latex, document.getElementById('free-render')!),
    );
  }

  private async _renderInto(targetId: string, errorId: string | null, render: () => Promise<void>): Promise<void> {
    try {
      await render();
      if (errorId) this._setMessage(errorId, null, 'error');
    } catch (error) {
      document.getElementById(targetId)!.replaceChildren();
      if (errorId) this._setMessage(errorId, (error as Error).message, 'error');
    }
  }

  private _setValidity(elementId: string, latex: string): void {
    const element = document.getElementById(elementId)!;
    const verdict = latex ? this._validator.validate(latex) : null;

    element.classList.remove('valid', 'invalid');
    if (!latex) {
      element.textContent = '';
      return;
    }

    element.classList.add(verdict === null ? 'valid' : 'invalid');
    element.textContent = verdict === null ? 'KaTeX: valid LaTeX' : `KaTeX: ${verdict}`;
  }

  private _setMessage(elementId: string, message: string | null, kind: 'error'): void {
    const element = document.getElementById(elementId)!;
    element.classList.toggle('hidden', message === null);
    element.classList.add(kind);
    element.textContent = message ?? '';
  }

  private _mathmlInput(): HTMLTextAreaElement {
    return document.getElementById('mathml-input') as HTMLTextAreaElement;
  }

  private _freeInput(): HTMLTextAreaElement {
    return document.getElementById('free-input') as HTMLTextAreaElement;
  }

  private _latexOutput(): HTMLPreElement {
    return document.getElementById('latex-output') as HTMLPreElement;
  }
}
