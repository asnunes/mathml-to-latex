import { MathMLElement } from '../../protocols/mathml-element';

/**
 * Normalizes bare fence operators into `<mfenced>` elements, in place.
 *
 * MathML often delimits content with standalone `<mo>` operators (`<mo>(</mo>
 * ... <mo>)</mo>`). Converted in isolation, each becomes a self-balanced
 * `\left(\right.` / `\left.\right)` (a lone `\left(` is invalid LaTeX), which
 * leaves dangling `\right.`/`\left.` fillers in the output. This pass pairs the
 * fence operators that are real siblings and rewrites each pair into an
 * `<mfenced>`, so the existing converter produces a single stretchy
 * `\left( ... \right)` pair, and a parenthesized `<mtable>` naturally becomes a
 * `pmatrix`.
 *
 * Pairing is positional (a closer matches the nearest open fence) and may mix
 * types (`(` with `]`), which `<mfenced>` renders as valid asymmetric
 * delimiters. Only parentheses and square brackets and braces participate;
 * vertical bars are ambiguous (same glyph on both sides) and are left untouched,
 * as is any fence that does not find a match.
 *
 * @param root - the root element whose subtree is normalized in place.
 */
export const normalizeFences = (root: MathMLElement): void => {
  const stack: MathMLElement[] = [root];

  while (stack.length > 0) {
    const node = stack.pop() as MathMLElement;
    const children = node.children;
    if (!children || children.length === 0) continue;

    const paired = pairFences(children);
    if (paired !== children) children.splice(0, children.length, ...paired);

    for (const child of children) stack.push(child);
  }
};

const OPENERS = new Set(['(', '[', '{']);
const CLOSERS = new Set([')', ']', '}']);

/** Pairs sibling fence operators, returning a rewritten list (or the original when nothing pairs). */
const pairFences = (children: MathMLElement[]): MathMLElement[] => {
  const closerByOpener = matchFences(children);
  if (closerByOpener.size === 0) return children;

  const build = (start: number, end: number): MathMLElement[] => {
    const result: MathMLElement[] = [];
    let index = start;

    while (index < end) {
      const closerIndex = closerByOpener.get(index);
      if (closerIndex === undefined || closerIndex >= end) {
        result.push(children[index]);
        index += 1;
        continue;
      }

      const content = build(index + 1, closerIndex);
      result.push(makeFence(children[index], children[closerIndex], content));
      index = closerIndex + 1;
    }

    return result;
  };

  return build(0, children.length);
};

/** Maps each matched opener index to its closer index via a stack (nearest open wins). */
const matchFences = (children: MathMLElement[]): Map<number, number> => {
  const closerByOpener = new Map<number, number>();
  const openIndexes: number[] = [];

  children.forEach((child, index) => {
    if (isOpener(child)) {
      openIndexes.push(index);
    } else if (isCloser(child) && openIndexes.length > 0) {
      closerByOpener.set(openIndexes.pop() as number, index);
    }
  });

  return closerByOpener;
};

/** Builds an `<mfenced>` around the paired content, passing a lone child directly to preserve matrix mode. */
const makeFence = (opener: MathMLElement, closer: MathMLElement, content: MathMLElement[]): MathMLElement => ({
  name: 'mfenced',
  value: '',
  children: [content.length === 1 ? content[0] : wrapInRow(content)],
  attributes: { open: opener.value.trim(), close: closer.value.trim() },
});

/** Wraps several nodes in a single `<mrow>` so `<mfenced>` does not insert separators between them. */
const wrapInRow = (children: MathMLElement[]): MathMLElement => ({
  name: 'mrow',
  value: '',
  children,
  attributes: {},
});

const isOpener = (element: MathMLElement): boolean => element.name === 'mo' && OPENERS.has(element.value.trim());

const isCloser = (element: MathMLElement): boolean => element.name === 'mo' && CLOSERS.has(element.value.trim());
