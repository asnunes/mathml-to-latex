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

  it.each(['1', 'medium', 'unknownvalue'])('keeps \\frac for default-equivalent linethickness %s', (linethickness) => {
    expect(new MFrac(mfrac([mn('1'), mn('2')], { linethickness })).convert()).toBe('\\frac{1}{2}');
  });

  it.each([
    { linethickness: '2pt', thickness: '2pt' },
    { linethickness: '0.4mm', thickness: '0.4mm' },
    { linethickness: '2em', thickness: '2em' },
    { linethickness: '2', thickness: '0.8pt' },
    { linethickness: 'thin', thickness: '0.2pt' },
    { linethickness: 'thick', thickness: '0.8pt' },
    { linethickness: '3px', thickness: '2.25pt' },
    { linethickness: '50%', thickness: '0.2pt' },
  ])('keeps the bar thickness with \\genfrac when linethickness is $linethickness', ({ linethickness, thickness }) => {
    expect(new MFrac(mfrac([mn('1'), mn('2')], { linethickness })).convert()).toBe(
      `\\genfrac{}{}{${thickness}}{}{1}{2}`,
    );
  });

  it('throws when it does not have exactly two children', () => {
    expect(() => new MFrac(mfrac([mn('1'), mn('2'), mn('3')])).convert()).toThrow(
      new InvalidNumberOfChildrenError('mfrac', 2, 3),
    );
  });
});
