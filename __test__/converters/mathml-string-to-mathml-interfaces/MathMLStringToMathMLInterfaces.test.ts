import { MathMLStringToMathMLInterfaces } from '../../../src/converters/mathml-string-to-mathml-interfaces';
import { singleMi } from '../../mocks/mathmlStrings';

describe('#convert', () => {
  describe('given math string with mi tag', () => {
    it('return array with single mathml interface of name math and child mi', () => {
      const mathmlString = singleMi;

      const result = new MathMLStringToMathMLInterfaces(mathmlString).convert();

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject({
        attributes: {},
        children: [{ attributes: {}, children: [], name: 'mi', value: '' }],
        name: 'math',
        value: '',
      });
    });
  });
});
