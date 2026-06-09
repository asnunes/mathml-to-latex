declare module 'mathjax/tex-mml-svg.js';

// KaTeX ships no type declarations; only the call the validator uses is typed.
declare module 'katex' {
  interface KatexRenderOptions {
    displayMode?: boolean;
    throwOnError?: boolean;
  }
  const katex: { renderToString(tex: string, options?: KatexRenderOptions): string };
  export default katex;
}
