import { MathMLElement } from '../../protocols/mathml-element';
import { MathMLElementToLatexConverterAdapter } from './mathml-element-to-latex-converter-adapter';
import { setConversionMemo } from '../../helpers/mathml-element-to-latex-converter';
import { isLinearSystemPattern } from './linear-system-pattern';
import { FenceNormalizer } from './fence-normalizer';

/**
 * Converts a MathML element tree to LaTeX iteratively, using an explicit stack
 * instead of recursion so arbitrarily deep nesting cannot overflow the call
 * stack. Nodes are evaluated post-order (children before parents) and each
 * result is memoized; converters then read their children's precomputed strings
 * through {@link mathMLElementToLaTeXConverter} instead of recursing.
 *
 * @param root - the root element of the tree to convert.
 * @returns the LaTeX string for the whole tree.
 */
export const convertTreeToLatex = (root: MathMLElement): string => {
  new FenceNormalizer(root).normalize();
  annotateTables(root);

  const memo = new Map<MathMLElement, string>();
  const stack: { node: MathMLElement; visited: boolean }[] = [{ node: root, visited: false }];
  const previousMemo = setConversionMemo(memo);

  try {
    while (stack.length > 0) {
      const frame = stack[stack.length - 1];

      if (!frame.visited) {
        frame.visited = true;
        const children = frame.node.children ?? [];
        for (let i = children.length - 1; i >= 0; i--) stack.push({ node: children[i], visited: false });
        continue;
      }

      stack.pop();
      memo.set(frame.node, new MathMLElementToLatexConverterAdapter(frame.node).toLatexConverter().convert());
    }
  } finally {
    setConversionMemo(previousMemo);
  }

  return memo.get(root) ?? '';
};

// Flags tables and rows for their converters in a single iterative top-down
// pass (so it cannot overflow the call stack): `innerTable` marks every mtable
// nested inside another mtable, `bareTable` marks every mtable that no other
// converter wraps in an environment (not inside an mfenced, not the table of a
// linear-system row), and `bareRow` marks every mtr with no mtable ancestor.
// The flagged converters then emit a valid environment themselves, keeping the
// invariant that `&`/`\\` alignment markers never appear outside one.
const annotateTables = (root: MathMLElement): void => {
  type Frame = { node: MathMLElement; insideMtable: boolean; wrapped: boolean };
  const stack: Frame[] = [{ node: root, insideMtable: false, wrapped: false }];

  while (stack.length > 0) {
    const { node, insideMtable, wrapped } = stack.pop() as Frame;
    if (node.name === 'mtable') {
      if (insideMtable) node.attributes['innerTable'] = 'innerTable';
      else if (!wrapped) node.attributes['bareTable'] = 'bareTable';
    }
    if (node.name === 'mtr' && !insideMtable) node.attributes['bareRow'] = 'bareRow';

    const childInsideMtable = insideMtable || node.name === 'mtable';
    const childWrapped = wrapped || node.name === 'mfenced';
    const linearSystemTable = isLinearSystemPattern(node) ? node.children[1] : undefined;

    const children = node.children ?? [];
    for (let i = 0; i < children.length; i++) {
      stack.push({
        node: children[i],
        insideMtable: childInsideMtable,
        wrapped: childWrapped || children[i] === linearSystemTable,
      });
    }
  }
};
