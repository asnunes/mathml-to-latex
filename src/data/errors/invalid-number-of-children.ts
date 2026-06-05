/**
 * Thrown when a MathML element does not have the number of children its
 * converter requires (e.g. `<mfrac>` needs exactly two).
 */
export class InvalidNumberOfChildrenError extends Error {
  /**
   * @param tagName - the offending element's tag name.
   * @param expectedNumberOfChild - the number of children the converter expects.
   * @param currentNumberOfChild - the number of children actually present.
   * @param comparison - how to read the expectation (e.g. `exactly`, `at least`).
   */
  constructor(tagName: string, expectedNumberOfChild: number, currentNumberOfChild: number, comparison = 'exactly') {
    super(
      `${tagName} tag must have ${comparison} ${expectedNumberOfChild} children. It's actually ${currentNumberOfChild}`,
    );
    this.name = 'InvalidNumberOfChildrenError';
  }
}
