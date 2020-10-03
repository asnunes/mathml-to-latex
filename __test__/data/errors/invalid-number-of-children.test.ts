import { InvalidNumberOfChild } from '../../../src/data/errors/invalid-number-of-children';

describe('InvalidNumberOfChild', () => {
  describe('when error is created without comparison', () => {
    it('returns error message telling that need exactly given number of children', () => {
      const invalidNumberOfChild = new InvalidNumberOfChild('tag', 2, 1);

      const result = invalidNumberOfChild.message;

      expect(result).toEqual("tag tag must have exactly 2 children. It's actually 1");
    });

    it('returns name as InvalidNumberOfChild', () => {
      const invalidNumberOfChild = new InvalidNumberOfChild('tag', 2, 1);

      const result = invalidNumberOfChild.name;

      expect(result).toEqual('InvalidNumberOfChild');
    });

    it('extends Error', () => {
      const result = new InvalidNumberOfChild('tag', 2, 1);

      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('when error is created with comparison setted as at least', () => {
    it('returns error message telling that need exactly given number of children', () => {
      const invalidNumberOfChild = new InvalidNumberOfChild('tag', 4, 2, 'at least');

      const result = invalidNumberOfChild.message;

      expect(result).toEqual("tag tag must have at least 4 children. It's actually 2");
    });
  });
});
