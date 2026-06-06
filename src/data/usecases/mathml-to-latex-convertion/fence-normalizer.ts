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

  constructor(children: MathMLElement[]) {
    this._children = children;
  }

  /**
   * @returns a rewritten list with each matched pair nested into an `<mfenced>`,
   * or the original list (same reference) when nothing pairs.
   *
   * Single left-to-right pass: an opener starts a frame that collects its
   * content, a closer turns the innermost open frame into an `<mfenced>`, and any
   * frame still open at the end (an unmatched opener) is spilled back so it stays
   * a plain self-balanced delimiter. No recursion and no per-pop copying, so it
   * stays `O(n)` even for deeply nested or unbalanced input.
   */
  pair(): MathMLElement[] {
    const root: MathMLElement[] = [];
    const openFrames: Frame[] = [];
    let current = root;
    let paired = false;

    for (const child of this._children) {
      if (this._isOpener(child)) {
        const frame: Frame = { opener: child, content: [] };
        openFrames.push(frame);
        current = frame.content;
        continue;
      }

      if (this._isCloser(child) && openFrames.length > 0) {
        const frame = openFrames.pop() as Frame;
        current = openFrames.length > 0 ? openFrames[openFrames.length - 1].content : root;
        current.push(this._makeFence(frame.opener, child, frame.content));
        paired = true;
        continue;
      }

      current.push(child);
    }

    if (!paired) return this._children;

    for (const frame of openFrames) this._spill(frame, root);
    return root;
  }

  /** Spills an unmatched opener and its collected content back into the result, keeping source order. */
  private _spill(frame: Frame, target: MathMLElement[]): void {
    target.push(frame.opener);
    for (const node of frame.content) target.push(node);
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

/** An open fence and the sibling content collected since, awaiting a closer. */
interface Frame {
  opener: MathMLElement;
  content: MathMLElement[];
}
