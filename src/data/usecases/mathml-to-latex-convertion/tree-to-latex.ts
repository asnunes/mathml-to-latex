import { MathMLElement } from '../../protocols/mathml-element';
import { MathMLElementToLatexConverterAdapter } from './mathml-element-to-latex-converter-adapter';
import { setConversionMemo } from '../../helpers/mathml-element-to-latex-converter';
import { TreeNormalizer } from './tree-normalizer';
import { FenceNormalizer } from './fence-normalizer';
import { TableAnnotator } from './table-annotator';

/**
 * Converts a MathML element tree to LaTeX iteratively, using an explicit stack
 * instead of recursion so arbitrarily deep nesting cannot overflow the call
 * stack. Nodes are evaluated post-order (children before parents) and each
 * result is memoized; converters then read their children's precomputed strings
 * through {@link mathMLElementToLaTeXConverter} instead of recursing.
 *
 * Before the conversion loop, every {@link TreeNormalizer} in the pipeline runs
 * over the tree in order. New pre-passes are added to {@link makeTreeNormalizers}
 * without modifying the loop or the existing passes.
 *
 * @param root - the root element of the tree to convert.
 * @returns the LaTeX string for the whole tree.
 */
export const convertTreeToLatex = (root: MathMLElement): string => {
  for (const normalizer of makeTreeNormalizers(root)) normalizer.normalize();

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

/** The normalization pipeline, in execution order. */
const makeTreeNormalizers = (root: MathMLElement): TreeNormalizer[] => [
  new FenceNormalizer(root),
  new TableAnnotator(root),
];
