import { MRow } from './mrow';
import { MathMLElement } from '../../../protocols/mathml-element';

const node = (name: string, value: string): MathMLElement => ({ name, value, children: [], attributes: {} });

describe('MRow', () => {
  it('joins its children with spaces', () => {
    const mrow: MathMLElement = {
      name: 'mrow',
      value: '',
      children: [node('mn', '2'), node('mo', '+'), node('mn', '2')],
      attributes: {},
    };
    expect(new MRow(mrow).convert()).toBe('2 + 2');
  });
});
