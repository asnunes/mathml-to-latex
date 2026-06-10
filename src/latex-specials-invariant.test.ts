import { MathMLToLaTeX } from '.';

/**
 * Property: token content (`mtext`, `mi`, `mn`, `mo`) never leaks an active
 * LaTeX special into the output. Whatever the input text, every `# $ % & _`
 * in the converted LaTeX is escaped, `~ ^ \` only appear as commands, and
 * grouping braces stay balanced — so raw token text can never act as LaTeX
 * syntax (macro parameter, math shift, subscript, grouping).
 */
describe('latex specials invariant', () => {
  const SAMPLES_PER_TOKEN = 500;

  it.each(['mtext', 'mi', 'mn', 'mo'])('escapes every special leaking through <%s>', (tag) => {
    const random = lcg(SEED_BY_TAG[tag]);

    for (let sample = 0; sample < SAMPLES_PER_TOKEN; sample++) {
      const text = randomText(random);
      const mathml = `<math><${tag}>${xmlEscape(text)}</${tag}></math>`;

      const latex = MathMLToLaTeX.convert(mathml);
      const residue = stripCommands(latex);

      expect({ tag, text, latex, leaked: findLeak(residue) }).toEqual({ tag, text, latex, leaked: null });
    }
  });
});

type Random = () => number;

/** Deterministic linear congruential generator, so failures reproduce by seed. */
const lcg = (seed: number): Random => {
  let state = seed >>> 0;
  return () => (state = (state * 1664525 + 1013904223) >>> 0) / 0x100000000;
};

const SEED_BY_TAG: Record<string, number> = { mtext: 1, mi: 2, mn: 3, mo: 4 };

// Letters, accents, digits, every LaTeX special, plain punctuation and glyphs
// the lookup tables know — the mix real documents throw at token elements.
const TEXT_CHARS = [...'aBz39 ', ...'éãçüñõ', ...'αβΔ→±≤', ...'#$%&_{}~^\\', ...'+-=:;.,!?()<>/\'"', '⁡', '⁢', '日'];

const randomText = (random: Random): string => {
  const length = 1 + Math.floor(random() * 8);
  let text = '';
  for (let i = 0; i < length; i++) text += TEXT_CHARS[Math.floor(random() * TEXT_CHARS.length)];
  return text;
};

const xmlEscape = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** Removes LaTeX commands and single-char escapes, leaving only literal output text. */
const stripCommands = (latex: string): string => latex.replace(/\\[a-zA-Z]+/g, '').replace(/\\[^a-zA-Z]/g, '');

/** @returns the first special that survived unescaped, or null when the output is clean. */
const findLeak = (residue: string): string | null => {
  const leakedSpecial = residue.match(/[#$%&_~^\\]/);
  if (leakedSpecial) return leakedSpecial[0];

  let depth = 0;
  for (const char of residue) {
    if (char === '{') depth++;
    if (char === '}') depth--;
    if (depth < 0) return 'unbalanced }';
  }
  return depth === 0 ? null : 'unbalanced {';
};
