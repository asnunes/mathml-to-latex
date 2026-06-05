import { MAction } from './maction';
import { MathMLElement } from '../../../protocols/mathml-element';

const mi = (v: string): MathMLElement => ({ name: 'mi', value: v, children: [], attributes: {} });
const maction = (children: MathMLElement[], attributes: Record<string, string> = {}): MathMLElement => ({
  name: 'maction',
  value: '',
  children,
  attributes,
});

describe('MAction', () => {
  it.each([['toggle'], [undefined]])('joins children with an arrow when actiontype is %s', (actiontype) => {
    const attributes: Record<string, string> = actiontype ? { actiontype } : {};
    expect(new MAction(maction([mi('a'), mi('b')], attributes)).convert()).toBe('a \\Longrightarrow b');
  });

  it.each(['statusline', 'tooltip'])('keeps only the first child for actiontype %s', (actiontype) => {
    expect(new MAction(maction([mi('a'), mi('b')], { actiontype })).convert()).toBe('a');
  });
});
