export class InvalidNumberOfChild extends Error {
  constructor(tagName: string, expectedNumberOfChild: number, currentNumberOfChild: number) {
    super(`${tagName} tag must have exactly ${expectedNumberOfChild} children. It's actually ${currentNumberOfChild}`);
  }
}
