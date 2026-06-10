import { MO } from './mo';
import { MathMLElement } from '../../../../protocols/mathml-element';

const mo = (value: string): MathMLElement => ({ name: 'mo', value, children: [], attributes: {} });

describe('MO', () => {
  it.each([
    ['returns a simple operator as-is', '+', '+'],
    ['maps a known operator glyph to its command', '∑', '\\sum'],
    ['trims surrounding whitespace', '  =  ', '='],
    ['maps a lone underscore to a literal escape', '_', '\\_'],
    ['escapes LaTeX specials in unmapped values', 'a$b', 'a\\$b'],
  ])('%s', (_name, value, expected) => {
    expect(new MO(mo(value)).convert()).toBe(expected);
  });
});
