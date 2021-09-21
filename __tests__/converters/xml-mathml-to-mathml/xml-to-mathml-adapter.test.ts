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
  mfencedWithBrokenAttributeCase1,
  mfencedWithBrokenAttributeCase2,
  mfencedWithBrokenAttributeCase4,
  mfencedWithBrokenAttributeCase3,
  mfencedWithBrokenAttributeCase5,
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
        name: 'math',
        value: '',
        attributes: {},
        children: [{ attributes: {}, children: [], name: 'mi', value: 'a' }],
      });
    });
  });

  describe('given math tag outside any other tag', () => {
    test('return array with single mathml interface of name math and child mi', () => {
      const mathmlString = singleMiNoRoot;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        name: 'math',
        value: '',
        attributes: {},
        children: [{ attributes: {}, children: [], name: 'mi', value: 'b' }],
      });
    });
  });

  describe('given math string with nested tags', () => {
    test('return content in a three and keep value on each child', () => {
      const mathmlString = mrow;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        name: 'math',
        value: '',
        attributes: {},
        children: [
          {
            name: 'mrow',
            value: '',
            attributes: {},
            children: [
              { attributes: {}, children: [], name: 'mn', value: '2' },
              { attributes: {}, children: [], name: 'mo', value: '+' },
              { attributes: {}, children: [], name: 'mn', value: '2' },
            ],
          },
        ],
      });
    });
  });

  describe("given math string with mfenced with three contents with separator attribute ';;;'", () => {
    test('add attributes to children related with name mfenced', () => {
      const mathmlString = mfencedWithSeparatorAttribute;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        name: 'math',
        value: '',
        attributes: {},
        children: [
          {
            name: 'mfenced',
            value: '',
            attributes: { separators: ';;;' },
            children: [
              { attributes: {}, children: [], name: 'mn', value: '3' },
              { attributes: {}, children: [], name: 'mn', value: '2' },
              { attributes: {}, children: [], name: 'mn', value: '1' },
            ],
          },
        ],
      });
    });
  });

  describe('given math string with mfenced with single content, open attr settled as { and void close tag', () => {
    test('add attributes to children related with name mfenced', () => {
      const mathmlString = mfencedWithBrokenAttributeCase1;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        name: 'math',
        value: '',
        attributes: {},
        children: [
          {
            name: 'mfenced',
            value: '',
            attributes: { open: '{' },
            children: [{ name: 'mn', value: '3', attributes: {}, children: [] }],
          },
        ],
      });
    });
  });

  describe('given math with two broken mfenced', () => {
    test('add attributes to children related with name mfenced', () => {
      const mathmlString = mfencedWithBrokenAttributeCase3;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        name: 'math',
        value: '',
        attributes: {},
        children: [
          {
            name: 'mfenced',
            value: '',
            attributes: { open: '{' },
            children: [{ name: 'mn', value: '3', attributes: {}, children: [] }],
          },
          {
            name: 'mfenced',
            value: '',
            attributes: { open: '{' },
            children: [{ name: 'mn', value: '5', attributes: {}, children: [] }],
          },
        ],
      });
    });
  });

  describe('given math with two broken arguments', () => {
    test('ignore broken args', () => {
      const mathmlString = mfencedWithBrokenAttributeCase5;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        name: 'math',
        value: '',
        attributes: {},
        children: [
          {
            name: 'mfenced',
            value: '',
            attributes: {},
            children: [{ name: 'mn', value: '3', attributes: {}, children: [] }],
          },
        ],
      });
    });
  });

  describe('given math string with mfenced with single content, open attr settled as { and close attribute with = only', () => {
    test('add attributes to children related with name mfenced', () => {
      const mathmlString = mfencedWithBrokenAttributeCase2;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        name: 'math',
        value: '',
        attributes: {},
        children: [
          {
            name: 'mfenced',
            value: '',
            attributes: { open: '{' },
            children: [{ name: 'mn', value: '3', attributes: {}, children: [] }],
          },
        ],
      });
    });
  });

  describe('given math with two broken mfenced', () => {
    test('add attributes to children related with name mfenced', () => {
      const mathmlString = mfencedWithBrokenAttributeCase4;

      const result = makeSut().convert(mathmlString);

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        name: 'math',
        value: '',
        attributes: {},
        children: [
          {
            name: 'mfenced',
            value: '',
            attributes: { open: '{' },
            children: [{ name: 'mn', value: '3', attributes: {}, children: [] }],
          },
          {
            name: 'mfenced',
            value: '',
            attributes: { open: '{' },
            children: [{ name: 'mn', value: '5', attributes: {}, children: [] }],
          },
        ],
      });
    });
  });
});
