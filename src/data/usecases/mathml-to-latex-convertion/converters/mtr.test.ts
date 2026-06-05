import { MTr } from './mtr';
import { MathMLElement } from '../../../protocols/mathml-element';

const mn = (v: string): MathMLElement => ({ name: 'mn', value: v, children: [], attributes: {} });
const mtd = (c: MathMLElement): MathMLElement => ({ name: 'mtd', value: '', children: [c], attributes: {} });

describe('MTr', () => {
  it('joins its cells with ampersands', () => {
    const mtr: MathMLElement = { name: 'mtr', value: '', children: [mtd(mn('1')), mtd(mn('2'))], attributes: {} };
    expect(new MTr(mtr).convert()).toBe('1 & 2');
  });
});
