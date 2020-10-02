import {
  XmlToMathMLAdapter,
  ElementsToMathMLAdapter,
  ErrorHandler,
} from '../../../src/infra/usecases/xmldom-to-mathml-elements';

import {
  singleMi,
  singleMiNoRoot,
  mrow,
  mfencedWithSeparatorAttribute,
  mfencedWithBrokenAttribute,
} from '../../mocks/mathmlStrings';

describe('#convert', () => {
  const makeSut = (): XmlToMathMLAdapter => {
    const elementsToMathMLAdapter = new ElementsToMathMLAdapter();
    const errorHandler = new ErrorHandler();

    return new XmlToMathMLAdapter(elementsToMathMLAdapter, errorHandler);
  };

  describe('given math string with mi tag', () => {
    it('return array with single mathml interface of name math and child mi', () => {
      const mathmlString = singleMi;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        attributes: {},
        children: [{ attributes: {}, children: [], name: 'mi', value: 'a' }],
        name: 'math',
        value: '',
      });
    });
  });

  describe('given math tag outside any other tag', () => {
    test('return array with single mathml interface of name math and child mi', () => {
      const mathmlString = singleMiNoRoot;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        attributes: {},
        children: [{ attributes: {}, children: [], name: 'mi', value: 'b' }],
        name: 'math',
        value: '',
      });
    });
  });

  describe('given math string with nested tags', () => {
    test('return content in a three and keep value on each child', () => {
      const mathmlString = mrow;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        attributes: {},
        children: [
          {
            attributes: {},
            children: [
              { attributes: {}, children: [], name: 'mn', value: '2' },
              { attributes: {}, children: [], name: 'mo', value: '+' },
              { attributes: {}, children: [], name: 'mn', value: '2' },
            ],
            name: 'mrow',
            value: '',
          },
        ],
        name: 'math',
        value: '',
      });
    });
  });

  describe("given math string with mfenced with three contents with separator attribute ';;;'", () => {
    test('add attributes to children related with name mfenced', () => {
      const mathmlString = mfencedWithSeparatorAttribute;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        attributes: {},
        children: [
          {
            attributes: { separators: ';;;' },
            children: [
              { attributes: {}, children: [], name: 'mn', value: '3' },
              { attributes: {}, children: [], name: 'mn', value: '2' },
              { attributes: {}, children: [], name: 'mn', value: '1' },
            ],
            name: 'mfenced',
            value: '',
          },
        ],
        name: 'math',
        value: '',
      });
    });
  });

  describe('given math string with mfenced with single content, open attr settled as { and void close tag', () => {
    test('add attributes to children related with name mfenced', () => {
      const mathmlString = mfencedWithBrokenAttribute;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        attributes: {},
        children: [
          {
            attributes: { open: '{', close: '' },
            children: [{ attributes: {}, children: [], name: 'mn', value: '3' }],
            name: 'mfenced',
            value: '',
          },
        ],
        name: 'math',
        value: '',
      });
    });
  });
});
