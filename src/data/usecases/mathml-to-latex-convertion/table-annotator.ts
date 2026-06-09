import { MathMLElement } from '../../protocols/mathml-element';
import { TreeNormalizer } from './tree-normalizer';
import { LinearSystemPattern } from './converters/mrow/linear-system-pattern';

/**
 * Pre-pass that flags tables and rows for their converters, in a single
 * iterative top-down walk (so it cannot overflow the call stack):
 *
 * - `innerTable`: every mtable nested inside another mtable;
 * - `bareTable`: every mtable that no other converter wraps in an environment
 *   (not inside an mfenced, not the table of a linear-system row);
 * - `bareRow`: every mtr with no mtable ancestor.
 *
 * The flagged converters then emit a valid environment themselves, keeping the
 * invariant that `&`/`\\` alignment markers never appear outside one.
 */
export class TableAnnotator implements TreeNormalizer {
  private readonly _root: MathMLElement;

  constructor(root: MathMLElement) {
    this._root = root;
  }

  /** Walks the tree and stamps the wrapper flags in place. */
  normalize(): void {
    const stack: Frame[] = [{ node: this._root, insideMtable: false, wrapped: false }];

    while (stack.length > 0) {
      const frame = stack.pop() as Frame;
      this._annotate(frame);
      this._pushChildren(frame, stack);
    }
  }

  private _annotate({ node, insideMtable, wrapped }: Frame): void {
    if (node.name === 'mtable') {
      if (insideMtable) node.attributes['innerTable'] = 'innerTable';
      else if (!wrapped) node.attributes['bareTable'] = 'bareTable';
    }

    if (node.name === 'mtr' && !insideMtable) node.attributes['bareRow'] = 'bareRow';
  }

  private _pushChildren({ node, insideMtable, wrapped }: Frame, stack: Frame[]): void {
    const childInsideMtable = insideMtable || node.name === 'mtable';
    const childWrapped = wrapped || node.name === 'mfenced';
    const linearSystemTable = LinearSystemPattern.matches(node) ? node.children[1] : undefined;

    const children = node.children ?? [];
    for (let i = 0; i < children.length; i++) {
      stack.push({
        node: children[i],
        insideMtable: childInsideMtable,
        wrapped: childWrapped || children[i] === linearSystemTable,
      });
    }
  }
}

/** Traversal frame: the node plus the ancestry context that decides its flags. */
interface Frame {
  node: MathMLElement;
  insideMtable: boolean;
  wrapped: boolean;
}
