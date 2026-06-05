import { MathMLElement } from '../../protocols/mathml-element';
import { MathMLElementToLatexConverterAdapter } from './mathml-element-to-latex-converter-adapter';
import { setConversionMemo } from '../../helpers/mathml-element-to-latex-converter';

// Converts a MathML element tree to LaTeX iteratively, using an explicit stack
// instead of recursion so arbitrarily deep nesting cannot overflow the call
// stack. Nodes are evaluated post-order (children before parents) and each
// result is memoized; converters then read children's precomputed strings.
export const convertTreeToLatex = (root: MathMLElement): string => {
  annotateInnerTables(root);

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

// Flags every mtable nested inside another mtable. This reproduces the
// cumulative effect of the previous recursive per-converter flagging, but in a
// single iterative top-down pass so it cannot overflow the call stack.
const annotateInnerTables = (root: MathMLElement): void => {
  const stack: { node: MathMLElement; insideMtable: boolean }[] = [{ node: root, insideMtable: false }];

  while (stack.length > 0) {
    const { node, insideMtable } = stack.pop() as { node: MathMLElement; insideMtable: boolean };
    if (node.name === 'mtable' && insideMtable) node.attributes['innerTable'] = 'innerTable';

    const childInsideMtable = insideMtable || node.name === 'mtable';
    const children = node.children ?? [];
    for (let i = 0; i < children.length; i++) stack.push({ node: children[i], insideMtable: childInsideMtable });
  }
};
