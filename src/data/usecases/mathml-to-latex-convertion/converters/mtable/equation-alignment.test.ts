import { EquationAlignment } from './equation-alignment';
import { MathMLElement } from '../../../../protocols/mathml-element';

const element = (
  name: string,
  children: MathMLElement[] = [],
  attributes: Record<string, string> = {},
  value = '',
): MathMLElement => ({ name, value, children, attributes });

const mo = (value: string): MathMLElement => element('mo', [], {}, value);
const mn = (value: string): MathMLElement => element('mn', [], {}, value);
const mtd = (children: MathMLElement[], attributes: Record<string, string> = {}): MathMLElement =>
  element('mtd', children, attributes);
const mtr = (...cells: MathMLElement[]): MathMLElement => element('mtr', cells);
const mtable = (rows: MathMLElement[], attributes: Record<string, string> = {}): MathMLElement =>
  element('mtable', rows, attributes);

describe('EquationAlignment.matches', () => {
  it('matches a table declaring mixed right/left columnalign', () => {
    const table = mtable([mtr(mtd([mn('1')]), mtd([mn('2')]))], { columnalign: 'right left' });
    expect(EquationAlignment.matches(table)).toBe(true);
  });

  it('matches when the mixed columnalign declaration lives on the cells', () => {
    const table = mtable([mtr(mtd([mn('1')], { columnalign: 'right' }), mtd([mn('2')], { columnalign: 'left' }))]);
    expect(EquationAlignment.matches(table)).toBe(true);
  });

  it('matches when every row has its second cell starting with a relational mo', () => {
    const table = mtable([mtr(mtd([mn('1')]), mtd([mo('='), mn('2')])), mtr(mtd([mn('3')]), mtd([mo('≤'), mn('4')]))]);
    expect(EquationAlignment.matches(table)).toBe(true);
  });

  it('rejects a single-alignment columnalign declaration', () => {
    const table = mtable([mtr(mtd([mn('1')]), mtd([mn('2')]))], { columnalign: 'center center' });
    expect(EquationAlignment.matches(table)).toBe(false);
  });

  it('rejects when only some rows break before a relation', () => {
    const table = mtable([mtr(mtd([mn('1')]), mtd([mo('='), mn('2')])), mtr(mtd([mn('3')]), mtd([mn('4')]))]);
    expect(EquationAlignment.matches(table)).toBe(false);
  });

  it('rejects when the second cell starts with a non-relational mo', () => {
    const table = mtable([mtr(mtd([mn('1')]), mtd([mo('−'), mn('2')]))]);
    expect(EquationAlignment.matches(table)).toBe(false);
  });

  it('rejects single-cell rows and empty tables', () => {
    expect(EquationAlignment.matches(mtable([mtr(mtd([mn('1')]))]))).toBe(false);
    expect(EquationAlignment.matches(mtable([]))).toBe(false);
  });
});
