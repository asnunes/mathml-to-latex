import { MUnderover } from './munderover';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });
const munderover = (children: MathMLElement[]): MathMLElement => ({
  name: 'munderover',
  value: '',
  children,
  attributes: {},
});

describe('MUnderover', () => {
  it('renders base with an under and an over script', () => {
    expect(new MUnderover(munderover([node('mi', 'x'), node('mn', '1'), node('mn', '2')])).convert()).toBe('x_{1}^{2}');
  });

  it('throws when it does not have exactly three children', () => {
    expect(() => new MUnderover(munderover([node('mi', 'x'), node('mn', '1')])).convert()).toThrow(
      InvalidNumberOfChildrenError,
    );
  });
});
