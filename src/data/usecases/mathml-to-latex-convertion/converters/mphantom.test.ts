import { MPhantom } from './mphantom';
import { MathMLElement } from '../../../protocols/mathml-element';

describe('MPhantom', () => {
  it('renders nothing, reserving no visible output', () => {
    const mphantom: MathMLElement = {
      name: 'mphantom',
      value: '',
      children: [{ name: 'mi', value: 'a', children: [], attributes: {} }],
      attributes: {},
    };
    expect(new MPhantom(mphantom).convert()).toBe('');
  });
});
