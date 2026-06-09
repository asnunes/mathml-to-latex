import katex from 'katex';

/**
 * Strict LaTeX validity oracle. MathJax is forgiving by design, so the
 * playground also runs every LaTeX string through KaTeX, whose parser rejects
 * output that would not compile (e.g. double subscripts, unbalanced
 * `\left`/`\right`), and surfaces the parse error message.
 */
export class LatexValidator {
  /** @returns null when KaTeX accepts the string, otherwise the parse error message. */
  validate(tex: string): string | null {
    try {
      katex.renderToString(tex, { displayMode: true, throwOnError: true });
      return null;
    } catch (error) {
      return (error as Error).message;
    }
  }
}
