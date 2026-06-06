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

    return this._build();
  }

  /** Maps each matched opener index to its closer index via a stack (nearest open wins). */
  private _match(): Map<number, number> {
    const closerByOpener = new Map<number, number>();
    const openIndexes: number[] = [];

    for (const [index, child] of this._children.entries()) {
      if (this._isOpener(child)) {
        openIndexes.push(index);
        continue;
      }
      if (this._isCloser(child) && openIndexes.length > 0) closerByOpener.set(openIndexes.pop() as number, index);
    }

    return closerByOpener;
  }

  /**
   * Rebuilds the list with each matched pair nested into an `<mfenced>`.
   *
   * Uses an explicit frame stack instead of recursion so deeply nested fences
   * cannot overflow the call stack, matching the iterative design of the rest of
   * the pipeline. Each open frame collects the content that will become an
   * `<mfenced>` once its closer is reached.
   */
  private _build(): MathMLElement[] {
    const root: MathMLElement[] = [];
    const frames: { opener: MathMLElement; closerIndex: number; outer: MathMLElement[] }[] = [];
    let current = root;

    for (const [index, child] of this._children.entries()) {
      const closerIndex = this._closerByOpener.get(index);
      if (closerIndex !== undefined) {
        frames.push({ opener: child, closerIndex, outer: current });
        current = [];
        continue;
      }

      const open = frames[frames.length - 1];
      if (open && open.closerIndex === index) {
        const content = current;
        frames.pop();
        current = open.outer;
        current.push(this._makeFence(open.opener, child, content));
        continue;
      }

      current.push(child);
    }

    return root;
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
