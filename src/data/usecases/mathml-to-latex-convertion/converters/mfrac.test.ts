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

  it.each(['0', '0pt', '0px', '0.0'])('omits the bar with \\genfrac when linethickness is %s', (linethickness) => {
    expect(new MFrac(mfrac([mn('n'), mn('k')], { linethickness })).convert()).toBe('\\genfrac{}{}{0pt}{}{n}{k}');
  });

  it('keeps \\frac when linethickness is non-zero', () => {
    expect(new MFrac(mfrac([mn('1'), mn('2')], { linethickness: '2pt' })).convert()).toBe('\\frac{1}{2}');
  });

  it('throws when it does not have exactly two children', () => {
    expect(() => new MFrac(mfrac([mn('1'), mn('2'), mn('3')])).convert()).toThrow(
      new InvalidNumberOfChildrenError('mfrac', 2, 3),
    );
  });
});
