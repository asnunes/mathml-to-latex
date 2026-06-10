import { MN } from './mn';
import { MathMLElement } from '../../../protocols/mathml-element';

const mn = (value: string): MathMLElement => ({ name: 'mn', value, children: [], attributes: {} });

describe('MN', () => {
  it('returns a plain number as-is', () => {
    expect(new MN(mn('42')).convert()).toBe('42');
  });

  it('trims surrounding whitespace', () => {
    expect(new MN(mn('  7  ')).convert()).toBe('7');
  });

  it('escapes LaTeX specials in unmapped values', () => {
    expect(new MN(mn('#1')).convert()).toBe('\\#1');
    expect(new MN(mn('$5.00')).convert()).toBe('\\$5.00');
  });
});
