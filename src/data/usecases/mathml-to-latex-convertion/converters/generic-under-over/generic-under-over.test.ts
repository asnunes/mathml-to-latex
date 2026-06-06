import { GenericUnderOver } from './generic-under-over';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { InvalidNumberOfChildrenError } from '../../../../errors/invalid-number-of-children';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });
const wrap = (name: 'mover' | 'munder', children: MathMLElement[]): MathMLElement => ({
  name,
  value: '',
  children,
  attributes: {},
});

describe('GenericUnderOver', () => {
  it('uses \\overset for <mover>', () => {
    expect(new GenericUnderOver(wrap('mover', [node('mi', 'x'), node('mo', '+')])).convert()).toBe('\\overset{+}{x}');
  });

  it('uses \\underset for <munder>', () => {
    expect(new GenericUnderOver(wrap('munder', [node('mi', 'x'), node('mo', '+')])).convert()).toBe('\\underset{+}{x}');
  });

  it('throws when it does not have exactly two children', () => {
    expect(() => new GenericUnderOver(wrap('mover', [node('mi', 'x')])).convert()).toThrow(
      InvalidNumberOfChildrenError,
    );
  });
});
