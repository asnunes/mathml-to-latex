import { MFenced } from './mfenced';
import { MathMLElement } from '../../../../protocols/mathml-element';

const mn = (v: string): MathMLElement => ({ name: 'mn', value: v, children: [], attributes: {} });
const mtd = (c: MathMLElement): MathMLElement => ({ name: 'mtd', value: '', children: [c], attributes: {} });
const mtr = (...cells: MathMLElement[]): MathMLElement => ({ name: 'mtr', value: '', children: cells, attributes: {} });
const mfenced = (children: MathMLElement[], attributes: Record<string, string> = {}): MathMLElement => ({
  name: 'mfenced',
  value: '',
  children,
  attributes,
});

describe('MFenced', () => {
  it('renders a vector wrapped in parentheses, joined by commas by default', () => {
    expect(new MFenced(mfenced([mn('3'), mn('2'), mn('1')])).convert()).toBe('\\left(3,2,1\\right)');
  });

  it('renders a contained mtable as the matrix environment matching its fences', () => {
    const table = { name: 'mtable', value: '', children: [mtr(mtd(mn('1')), mtd(mn('2')))], attributes: {} };
    expect(new MFenced(mfenced([table], { open: '[', close: ']' })).convert()).toBe(
      '\\begin{bmatrix}\n1 & 2\n\\end{bmatrix}',
    );
  });
});
