import { Math } from './math';
import { MathMLElement } from '../../../protocols/mathml-element';

const child = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });
const math = (children: MathMLElement[]): MathMLElement => ({ name: 'math', value: '', children, attributes: {} });

describe('Math', () => {
  it('joins its children with spaces', () => {
    expect(new Math(math([child('mn', '2'), child('mo', '+'), child('mn', '2')])).convert()).toBe('2 + 2');
  });

  it('normalizes whitespace in the result', () => {
    expect(new Math(math([child('mn', '1')])).convert()).toBe('1');
  });
});
