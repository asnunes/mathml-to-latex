import { MathMLElement } from '../../protocols/mathml-element';

/**
 * Detects the linear-system/piecewise shape emitted by editors and MathJax:
 * an `<mrow>` holding an opening `{` operator and an `<mtable>`, optionally
 * followed by an empty closing `<mo>`. The `<mrow>` converter renders this
 * shape as a LaTeX `cases` environment, so the inner table must not receive
 * another environment wrapper of its own.
 *
 * @param element - the element to test.
 * @returns true when the element matches the pattern.
 */
export const isLinearSystemPattern = (element: MathMLElement): boolean => {
  if (element.name !== 'mrow') return false;

  const children = element.children ?? [];
  if (children.length !== 2 && children.length !== 3) return false;

  const [first, second, third] = children;
  const isOpeningBrace = first.name === 'mo' && first.value.trim() === '{';
  const isTable = second.name === 'mtable';
  const isEmptyClosing = third === undefined || (third.name === 'mo' && third.value.trim() === '');

  return isOpeningBrace && isTable && isEmptyClosing;
};
