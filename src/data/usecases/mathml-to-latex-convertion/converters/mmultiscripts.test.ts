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

  it('renders a lone subscript when the superscript of a pair is missing', () => {
    expect(new MMultiscripts(mmultiscripts([node('mi', 'x'), node('mn', '1')])).convert()).toBe('x_{1}');
  });

  it('omits none placeholders instead of emitting empty scripts', () => {
    expect(new MMultiscripts(mmultiscripts([node('mi', 'x'), node('none', ''), node('mn', '2')])).convert()).toBe(
      'x^{2}',
    );
  });

  it('returns the base alone when there are no scripts', () => {
    expect(new MMultiscripts(mmultiscripts([node('mi', 'x')])).convert()).toBe('x');
  });

  it('throws when the base is missing', () => {
    expect(() => new MMultiscripts(mmultiscripts([])).convert()).toThrow(InvalidNumberOfChildrenError);
  });
});
