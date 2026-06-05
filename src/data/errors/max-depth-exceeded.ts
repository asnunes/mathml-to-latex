export class MaxDepthExceededError extends Error {
  constructor(maxDepth: number) {
    super(`MathML nesting is too deep. Maximum supported depth is ${maxDepth}.`);
    this.name = 'MaxDepthExceededError';
  }
}
