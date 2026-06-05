import { MSup } from './msup';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });
const msup = (children: MathMLElement[]): MathMLElement => ({ name: 'msup', value: '', children, attributes: {} });

describe('MSup', () => {
  it('renders base and superscript', () => {
    expect(new MSup(msup([node('mi', 'x'), node('mn', '2')])).convert()).toBe('x^{2}');
  });

  it('throws when it does not have exactly two children', () => {
    expect(() => new MSup(msup([node('mi', 'x')])).convert()).toThrow(InvalidNumberOfChildrenError);
  });
});
