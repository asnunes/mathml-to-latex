import { MathMLElement } from '../../protocols/mathml-element';
import { TreeNormalizer } from './tree-normalizer';
import { doubleBarFenceGlyphs } from '../../../syntax';

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
 * delimiters. Parentheses, square brackets and braces are directional. Vertical
 * bars (`|`) and double bars (`||`) share one glyph for both sides, so they
 * toggle: a bar opens a pair unless a same-glyph bar is already open at the
 * current level, in which case it closes it (so `|x|` becomes `\left|x\right|`
 * and `||x||` becomes the norm `\left\|x\right\|`). Any fence that does not find
 * a match is left untouched as a valid self-balanced delimiter.
 */
export class FenceNormalizer implements TreeNormalizer {
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
      const top = openFrames[openFrames.length - 1];

      if (this._opensFrame(child, top)) {
        const frame: Frame = { opener: child, content: [] };
        openFrames.push(frame);
        current = frame.content;
        continue;
      }

      if (this._closesFrame(child, top)) {
        const frame = openFrames.pop() as Frame;
        current = openFrames.length > 0 ? openFrames[openFrames.length - 1].content : root;
        current.push(this._makeFence(frame.opener, child, frame.content));
        paired = true;
        continue;
      }

      const scriptCloser = this._scriptBaseCloser(child, top);
      if (scriptCloser !== undefined) {
        const frame = openFrames.pop() as Frame;
        current = openFrames.length > 0 ? openFrames[openFrames.length - 1].content : root;
        const fence = this._makeFence(frame.opener, scriptCloser, frame.content);
        current.push({ ...child, children: [fence, ...child.children.slice(1)] });
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

  /**
   * Detects the closing bar of a scripted norm, the shape editors emit for
   * `‖P‖_F^2`: a script element whose base holds only the bar that matches the
   * open bar frame (`<mo>∥</mo><mi>P</mi><msubsup><mrow><mo>∥</mo></mrow>F 2`,
   * issue #43). Without this, the nested closer is invisible to the sibling
   * pass and the opener would pair with the *next* norm's opener, fencing the
   * wrong span. The frame content becomes the fence and the script attaches to
   * it: `msubsup(mfenced(P), F, 2)`.
   *
   * @returns the matching bar, or undefined when the child is not this shape.
   */
  private _scriptBaseCloser(child: MathMLElement, top: Frame | undefined): MathMLElement | undefined {
    if (top === undefined || !this._isBar(top.opener)) return undefined;
    if (!SCRIPT_ELEMENTS.has(child.name) || child.children.length === 0) return undefined;

    const base = child.children[0];
    const bar = base.name === 'mrow' && base.children.length === 1 ? base.children[0] : base;
    if (bar.name !== 'mo' || bar.value.trim() !== top.opener.value.trim()) return undefined;

    return bar;
  }

  /** A directional opener, or a vertical bar that does not close the current frame. */
  private _opensFrame(child: MathMLElement, top: Frame | undefined): boolean {
    if (this._isOpener(child)) return true;
    return this._isBar(child) && !this._closesBar(child, top);
  }

  /** A directional closer matching a directional frame, or a bar closing a same-glyph bar frame. */
  private _closesFrame(child: MathMLElement, top: Frame | undefined): boolean {
    if (top === undefined) return false;
    if (this._isCloser(child) && this._isOpener(top.opener)) return true;
    return this._closesBar(child, top);
  }

  /** Whether `child` is a bar that closes `top`, i.e. `top` is a bar frame opened by the same glyph. */
  private _closesBar(child: MathMLElement, top: Frame | undefined): boolean {
    if (top === undefined || !this._isBar(child) || !this._isBar(top.opener)) return false;
    return top.opener.value.trim() === child.value.trim();
  }

  private _isOpener(element: MathMLElement): boolean {
    return element.name === 'mo' && OPENERS.has(element.value.trim());
  }

  private _isCloser(element: MathMLElement): boolean {
    return element.name === 'mo' && CLOSERS.has(element.value.trim());
  }

  private _isBar(element: MathMLElement): boolean {
    return element.name === 'mo' && BARS.has(element.value.trim());
  }
}

const OPENERS = new Set(['(', '[', '{']);
const CLOSERS = new Set([')', ']', '}']);
// Single bar plus the double-bar family: bars toggle, so a sibling pair is
// read as an absolute value or norm (issue #43), while an odd leftover spills
// back and keeps its standalone meaning (`\mid`, `\parallel`).
const BARS = new Set(['|', ...doubleBarFenceGlyphs]);

/** Script elements whose base can hide the closing bar of a norm. */
const SCRIPT_ELEMENTS = new Set(['msub', 'msup', 'msubsup']);

/** An open fence and the sibling content collected since, awaiting a closer. */
interface Frame {
  opener: MathMLElement;
  content: MathMLElement[];
}
