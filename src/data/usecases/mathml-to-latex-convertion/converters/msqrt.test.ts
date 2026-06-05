import { MSqrt } from './msqrt';
import { MathMLElement } from '../../../protocols/mathml-element';

const mn = (v: string): MathMLElement => ({ name: 'mn', value: v, children: [], attributes: {} });
const msqrt = (children: MathMLElement[]): MathMLElement => ({ name: 'msqrt', value: '', children, attributes: {} });

describe('MSqrt', () => {
  it('wraps its content in a sqrt command', () => {
    expect(new MSqrt(msqrt([mn('2')])).convert()).toBe('\\sqrt{2}');
  });

  it('produces an empty sqrt when there is no content', () => {
    expect(new MSqrt(msqrt([])).convert()).toBe('\\sqrt{}');
  });
});
