import { MSubsup } from './msubsup';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });
const msubsup = (children: MathMLElement[]): MathMLElement => ({
  name: 'msubsup',
  value: '',
  children,
  attributes: {},
});

describe('MSubsup', () => {
  it('renders base, subscript and superscript', () => {
    expect(new MSubsup(msubsup([node('mi', 'x'), node('mn', '1'), node('mn', '2')])).convert()).toBe('x_{1}^{2}');
  });

  it('throws when it does not have exactly three children', () => {
    expect(() => new MSubsup(msubsup([node('mi', 'x'), node('mn', '1')])).convert()).toThrow(
      InvalidNumberOfChildrenError,
    );
  });
});
