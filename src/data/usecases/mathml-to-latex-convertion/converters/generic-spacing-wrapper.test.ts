import { GenericSpacingWrapper } from './generic-spacing-wrapper';
import { MathMLElement } from '../../../protocols/mathml-element';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });

describe('GenericSpacingWrapper', () => {
  it('joins its children with spaces', () => {
    const element: MathMLElement = {
      name: 'mpadded',
      value: '',
      children: [node('mn', '2'), node('mo', '+'), node('mn', '2')],
      attributes: {},
    };
    expect(new GenericSpacingWrapper(element).convert()).toBe('2 + 2');
  });
});
