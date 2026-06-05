import { Void } from './void';
import { MathMLElement } from '../../../protocols/mathml-element';

describe('Void', () => {
  it('always converts to an empty string', () => {
    const element: MathMLElement = { name: 'void', value: '', children: [], attributes: {} };
    expect(new Void(element).convert()).toBe('');
  });
});
