/**
 * List of LaTeX accent commands that wrap their argument directly (e.g.
 * `\hat{x}`). Consumed by the under/over converters to decide whether an accent
 * should be applied as a command rather than via `\overset`/`\underset`.
 */
export const latexAccents = ['\\hat', '\\bar', '\\underbrace', '\\overbrace'];
