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
 * delimiters. Only parentheses, square brackets and braces participate; vertical
 * bars are ambiguous (same glyph on both sides) and are left untouched, as is
 * any fence that does not find a match.
 */
export class FenceNormalizer {
  private readonly _root: MathMLElement;

  constructor(root: MathMLElement) {
    this._root = root;
  }

  /** Rewrites the subtree in place, pairing sibling fence operators into `<mfenced>`. */
  normalize(): void {
    const stack: MathMLElement[] = [this._root];

    while (stack.length > 0) {
      const node = stack.pop() as MathMLElement;
      const children = node.children;
      if (!children || children.length === 0) continue;

      const paired = new FencePairing(children).pair();
      if (paired !== children) children.splice(0, children.length, ...paired);

      for (const child of children) stack.push(child);
    }
  }
}

/** Pairs the fence operators within a single list of sibling nodes. */
class FencePairing {
  private readonly _children: MathMLElement[];
  private _closerByOpener: Map<number, number> = new Map();

  constructor(children: MathMLElement[]) {
    this._children = children;
  }

  /** @returns a rewritten list with matched pairs turned into `<mfenced>`, or the original when nothing pairs. */
  pair(): MathMLElement[] {
    this._closerByOpener = this._match();
    if (this._closerByOpener.size === 0) return this._children;

    return this._build(0, this._children.length);
  }

  /** Maps each matched opener index to its closer index via a stack (nearest open wins). */
  private _match(): Map<number, number> {
    const closerByOpener = new Map<number, number>();
    const openIndexes: number[] = [];

    this._children.forEach((child, index) => {
      if (this._isOpener(child)) {
        openIndexes.push(index);
      } else if (this._isCloser(child) && openIndexes.length > 0) {
        closerByOpener.set(openIndexes.pop() as number, index);
      }
    });

    return closerByOpener;
  }

  /** Rebuilds the `[start, end)` range, recursing into the content of each matched pair. */
  private _build(start: number, end: number): MathMLElement[] {
    const result: MathMLElement[] = [];
    let index = start;

    while (index < end) {
      const closerIndex = this._closerByOpener.get(index);
      if (closerIndex === undefined || closerIndex >= end) {
        result.push(this._children[index]);
        index += 1;
        continue;
      }

      const content = this._build(index + 1, closerIndex);
      result.push(this._makeFence(this._children[index], this._children[closerIndex], content));
      index = closerIndex + 1;
    }

    return result;
  }

  /** Builds an `<mfenced>` around the paired content, passing a lone child directly to preserve matrix mode. */
  private _makeFence(opener: MathMLElement, closer: MathMLElement, content: MathMLElement[]): MathMLElement {
    return {
      name: 'mfenced',
      value: '',
      children: [content.length === 1 ? content[0] : this._wrapInRow(content)],
      attributes: { open: opener.value.trim(), close: closer.value.trim() },
    };
  }

  /** Wraps several nodes in a single `<mrow>` so `<mfenced>` does not insert separators between them. */
  private _wrapInRow(children: MathMLElement[]): MathMLElement {
    return { name: 'mrow', value: '', children, attributes: {} };
  }

  private _isOpener(element: MathMLElement): boolean {
    return element.name === 'mo' && OPENERS.has(element.value.trim());
  }

  private _isCloser(element: MathMLElement): boolean {
    return element.name === 'mo' && CLOSERS.has(element.value.trim());
  }
}

const OPENERS = new Set(['(', '[', '{']);
const CLOSERS = new Set([')', ']', '}']);
