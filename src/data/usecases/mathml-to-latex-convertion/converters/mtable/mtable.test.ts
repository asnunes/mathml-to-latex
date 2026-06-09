import { MTable } from './mtable';
import { MathMLElement } from '../../../../protocols/mathml-element';

const mn = (v: string): MathMLElement => ({ name: 'mn', value: v, children: [], attributes: {} });
const mtd = (c: MathMLElement): MathMLElement => ({ name: 'mtd', value: '', children: [c], attributes: {} });
const mtr = (...cells: MathMLElement[]): MathMLElement => ({ name: 'mtr', value: '', children: cells, attributes: {} });

describe('MTable', () => {
  it('joins cells with ampersands and rows with line breaks', () => {
    const mtable: MathMLElement = {
      name: 'mtable',
      value: '',
      children: [mtr(mtd(mn('1')), mtd(mn('2'))), mtr(mtd(mn('3')), mtd(mn('4')))],
      attributes: {},
    };
    expect(new MTable(mtable).convert()).toBe('1 & 2 \\\\\n3 & 4');
  });

  it('wraps itself in a matrix environment when flagged as an inner table', () => {
    const mtable: MathMLElement = {
      name: 'mtable',
      value: '',
      children: [mtr(mtd(mn('1')))],
      attributes: { innerTable: 'innerTable' },
    };
    expect(new MTable(mtable).convert()).toBe('\\begin{matrix}1\\end{matrix}');
  });
});
