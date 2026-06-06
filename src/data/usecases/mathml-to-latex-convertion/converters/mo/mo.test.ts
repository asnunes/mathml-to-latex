import { MO } from './mo';
import { MathMLElement } from '../../../../protocols/mathml-element';

const mo = (value: string): MathMLElement => ({ name: 'mo', value, children: [], attributes: {} });

describe('MO', () => {
  it.each([
    ['returns a simple operator as-is', '+', '+'],
    ['maps a known operator glyph to its command', '∑', '\\sum'],
    ['trims surrounding whitespace', '  =  ', '='],
  ])('%s', (_name, value, expected) => {
    expect(new MO(mo(value)).convert()).toBe(expected);
  });
});
