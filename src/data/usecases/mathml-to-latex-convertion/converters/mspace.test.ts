import { MSpace } from './mspace';
import { MathMLElement } from '../../../protocols/mathml-element';

const mspace = (attributes: Record<string, string> = {}): MathMLElement => ({
  name: 'mspace',
  value: '',
  children: [],
  attributes,
});

describe('MSpace', () => {
  it('emits a LaTeX line break for linebreak="newline"', () => {
    expect(new MSpace(mspace({ linebreak: 'newline' })).convert()).toBe(' \\\\ ');
  });

  it('emits a single space otherwise', () => {
    expect(new MSpace(mspace()).convert()).toBe(' ');
  });
});
