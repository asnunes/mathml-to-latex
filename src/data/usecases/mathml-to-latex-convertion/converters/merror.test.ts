import { MError } from './merror';
import { MathMLElement } from '../../../protocols/mathml-element';

const mi = (v: string): MathMLElement => ({ name: 'mi', value: v, children: [], attributes: {} });

describe('MError', () => {
  it('wraps its content in a red color command', () => {
    const merror: MathMLElement = { name: 'merror', value: '', children: [mi('a')], attributes: {} };
    expect(new MError(merror).convert()).toBe('\\color{red}{a}');
  });
});
