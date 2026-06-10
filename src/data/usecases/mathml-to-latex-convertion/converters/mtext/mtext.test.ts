import { MText } from './mtext';
import { MathMLElement } from '../../../../protocols/mathml-element';

const mtext = (value: string, attributes: Record<string, string> = {}): MathMLElement => ({
  name: 'mtext',
  value,
  children: [],
  attributes,
});

describe('MText', () => {
  it('wraps plain text in a text command', () => {
    expect(new MText(mtext('hi')).convert()).toBe('\\text{hi}');
  });

  it('applies the text font command of the mathvariant', () => {
    expect(new MText(mtext('hi', { mathvariant: 'bold' })).convert()).toBe('\\textbf{hi}');
  });

  it('keeps plain punctuation inside the text run', () => {
    expect(new MText(mtext('a+b')).convert()).toBe('\\text{a+b}');
  });

  it('keeps accented letters literal inside the text run', () => {
    expect(new MText(mtext('café')).convert()).toBe('\\text{café}');
  });

  it('escapes LaTeX specials so they stay literal glyphs', () => {
    expect(new MText(mtext('a_b')).convert()).toBe('\\text{a\\_b}');
    expect(new MText(mtext('{x}')).convert()).toBe('\\text{\\{x\\}}');
    expect(new MText(mtext('50% off')).convert()).toBe('\\text{50\\% off}');
    expect(new MText(mtext('x ~ y')).convert()).toBe('\\text{x \\textasciitilde{} y}');
  });

  it('delegates symbols the lookup tables know to the mi converter', () => {
    expect(new MText(mtext('T = 2α')).convert()).toBe('\\text{T = 2}\\alpha');
  });
});
