/**
 * The glyphs MathML uses for double-bar (norm) fences: the ascii digraph and
 * the unicode characters `‖` (U+2016) and `∥` (U+2225), as in issue #43.
 *
 * Centralized so every consumer stays in sync: the fence normalizer (sibling
 * pairing), the generic wrapper (translation to the `\|` delimiter) and the
 * mfenced separators (Vmatrix classification).
 */
export const doubleBarFenceGlyphs: ReadonlySet<string> = new Set(['||', '‖', '∥']);
