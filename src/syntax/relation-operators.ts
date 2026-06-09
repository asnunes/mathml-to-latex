import { allMathOperatorsByGlyph } from './all-math-operators-by-glyph';

/**
 * LaTeX relation commands, the canonical names a relational operator resolves
 * to. This is the single curated list; the glyph set below is derived from the
 * operator lookup table, so every unicode variant that maps to one of these
 * commands (arrows, slanted inequalities, etc.) is classified automatically
 * and stays in sync with the table.
 */
const RELATION_COMMANDS = new Set([
  '=',
  '<',
  '>',
  '\\leq',
  '\\geq',
  '\\leqq',
  '\\geqq',
  '\\leqslant',
  '\\geqslant',
  '\\ll',
  '\\gg',
  '\\neq',
  '\\approx',
  '\\equiv',
  '\\sim',
  '\\simeq',
  '\\cong',
  '\\propto',
  '\\in',
  '\\notin',
  '\\subset',
  '\\supset',
  '\\subseteq',
  '\\supseteq',
  '\\to',
  '\\rightarrow',
  '\\Rightarrow',
  '\\Leftrightarrow',
  '\\mapsto',
]);

/**
 * Every operator glyph whose LaTeX translation is a relation command.
 * Consumed by converters that need to know whether an `<mo>` is relational
 * (e.g. multiline equation alignment detection).
 */
export const relationOperatorsByGlyph: Set<string> = new Set(
  Object.keys(allMathOperatorsByGlyph).filter((glyph) => RELATION_COMMANDS.has(allMathOperatorsByGlyph[glyph].trim())),
);
