import { MMultiscripts } from './mmultiscripts';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });
const mmultiscripts = (children: MathMLElement[]): MathMLElement => ({
  name: 'mmultiscripts',
  value: '',
  children,
  attributes: {},
});

describe('MMultiscripts', () => {
  it('renders the base with trailing sub/superscripts', () => {
    expect(new MMultiscripts(mmultiscripts([node('mi', 'x'), node('mn', '1'), node('mn', '2')])).convert()).toBe(
      'x_{1}^{2}',
    );
  });

  it('throws when it has fewer than three children', () => {
    expect(() => new MMultiscripts(mmultiscripts([node('mi', 'x'), node('mn', '1')])).convert()).toThrow(
      InvalidNumberOfChildrenError,
    );
  });
});
