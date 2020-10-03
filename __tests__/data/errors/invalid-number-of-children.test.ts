import { InvalidNumberOfChildrenError } from '../../../src/data/errors/invalid-number-of-children';

describe('InvalidNumberOfChildrenError', () => {
  describe('when error is created without comparison', () => {
    it('returns error message telling that need exactly given number of children', () => {
      const invalidNumberOfChildrenError = new InvalidNumberOfChildrenError('tag', 2, 1);

      const result = invalidNumberOfChildrenError.message;

      expect(result).toEqual("tag tag must have exactly 2 children. It's actually 1");
    });

    it('returns name as InvalidNumberOfChildrenError', () => {
      const invalidNumberOfChildrenError = new InvalidNumberOfChildrenError('tag', 2, 1);

      const result = invalidNumberOfChildrenError.name;

      expect(result).toEqual('InvalidNumberOfChildrenError');
    });

    it('extends Error', () => {
      const result = new InvalidNumberOfChildrenError('tag', 2, 1);

      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('when error is created with comparison setted as at least', () => {
    it('returns error message telling that need exactly given number of children', () => {
      const invalidNumberOfChildrenError = new InvalidNumberOfChildrenError('tag', 4, 2, 'at least');

      const result = invalidNumberOfChildrenError.message;

      expect(result).toEqual("tag tag must have at least 4 children. It's actually 2");
    });
  });
});
