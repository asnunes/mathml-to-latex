import { MFrac } from './mfrac';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

const mn = (value: string): MathMLElement => ({ name: 'mn', value, children: [], attributes: {} });
const mfrac = (children: MathMLElement[], attributes: Record<string, string> = {}): MathMLElement => ({
  name: 'mfrac',
  value: '',
  children,
  attributes,
});

describe('MFrac', () => {
  it('formats its two children as a fraction', () => {
    expect(new MFrac(mfrac([mn('1'), mn('2')])).convert()).toBe('\\frac{1}{2}');
  });

  it('uses the inline slash form when bevelled', () => {
    expect(new MFrac(mfrac([mn('1'), mn('2')], { bevelled: 'true' })).convert()).toBe('1/2');
  });

  it('throws when it does not have exactly two children', () => {
    expect(() => new MFrac(mfrac([mn('1'), mn('2'), mn('3')])).convert()).toThrow(
      new InvalidNumberOfChildrenError('mfrac', 2, 3),
    );
  });
});
