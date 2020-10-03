export class InvalidNumberOfChildrenError extends Error {
  constructor(tagName: string, expectedNumberOfChild: number, currentNumberOfChild: number, comparison = 'exactly') {
    super(
      `${tagName} tag must have ${comparison} ${expectedNumberOfChild} children. It's actually ${currentNumberOfChild}`,
    );
    this.name = 'InvalidNumberOfChildrenError';
  }
}
