import { MI } from './mi';
import { MathMLElement } from '../../../../protocols/mathml-element';

const mi = (value: string, attributes: Record<string, string> = {}): MathMLElement => ({
  name: 'mi',
  value,
  children: [],
  attributes,
});

describe('MI', () => {
  it('returns a plain identifier unchanged', () => {
    expect(new MI(mi('x')).convert()).toBe('x');
  });

  it('wraps the value in the font command of the mathvariant', () => {
    expect(new MI(mi('x', { mathvariant: 'bold' })).convert()).toBe('\\mathbf{x}');
  });

  it('ignores an unknown mathvariant', () => {
    expect(new MI(mi('x', { mathvariant: 'nonsense' })).convert()).toBe('x');
  });
});
