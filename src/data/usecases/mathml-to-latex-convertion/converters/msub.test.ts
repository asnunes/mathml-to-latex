import { MSub } from './msub';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });
const msub = (children: MathMLElement[]): MathMLElement => ({ name: 'msub', value: '', children, attributes: {} });

describe('MSub', () => {
  it('renders base and subscript', () => {
    expect(new MSub(msub([node('mi', 'x'), node('mn', '2')])).convert()).toBe('x_{2}');
  });

  it('throws when it does not have exactly two children', () => {
    expect(() => new MSub(msub([node('mi', 'x')])).convert()).toThrow(InvalidNumberOfChildrenError);
  });
});
