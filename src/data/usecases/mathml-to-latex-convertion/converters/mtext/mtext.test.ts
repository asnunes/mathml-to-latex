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

  it('delegates standalone symbols to the mi converter', () => {
    expect(new MText(mtext('a+b')).convert()).toBe('\\text{a}+\\text{b}');
  });
});
