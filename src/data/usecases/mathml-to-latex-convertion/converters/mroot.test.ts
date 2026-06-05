import { MRoot } from './mroot';
import { MathMLElement } from '../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../errors/invalid-number-of-children';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });
const mroot = (children: MathMLElement[]): MathMLElement => ({ name: 'mroot', value: '', children, attributes: {} });

describe('MRoot', () => {
  it('wraps the radicand and uses the index as the root', () => {
    expect(new MRoot(mroot([node('mi', 'x'), node('mn', '3')])).convert()).toBe('\\sqrt[3]{x}');
  });

  it('throws when it does not have exactly two children', () => {
    expect(() => new MRoot(mroot([node('mi', 'x')])).convert()).toThrow(InvalidNumberOfChildrenError);
  });
});
