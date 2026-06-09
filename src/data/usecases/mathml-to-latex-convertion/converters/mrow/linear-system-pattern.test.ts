import { LinearSystemPattern } from './linear-system-pattern';
import { MathMLElement } from '../../../../protocols/mathml-element';

const element = (name: string, value = '', children: MathMLElement[] = []): MathMLElement => ({
  name,
  value,
  children,
  attributes: {},
});

const openingBrace = (): MathMLElement => element('mo', '{');
const emptyMo = (): MathMLElement => element('mo', '');
const mtable = (): MathMLElement => element('mtable');
const mrow = (...children: MathMLElement[]): MathMLElement => element('mrow', '', children);

describe('LinearSystemPattern.matches', () => {
  it('matches the 3-child shape: brace, table and empty closing operator', () => {
    expect(LinearSystemPattern.matches(mrow(openingBrace(), mtable(), emptyMo()))).toBe(true);
  });

  it('matches the 2-child MathJax shape: brace and table without closing operator', () => {
    expect(LinearSystemPattern.matches(mrow(openingBrace(), mtable()))).toBe(true);
  });

  it('matches when the brace value carries surrounding whitespace', () => {
    expect(LinearSystemPattern.matches(mrow(element('mo', ' { '), mtable(), element('mo', '  ')))).toBe(true);
  });

  it('rejects elements other than mrow', () => {
    expect(LinearSystemPattern.matches(element('mfenced', '', [openingBrace(), mtable()]))).toBe(false);
  });

  it('rejects a row whose first child is not an opening brace', () => {
    expect(LinearSystemPattern.matches(mrow(element('mo', '('), mtable()))).toBe(false);
    expect(LinearSystemPattern.matches(mrow(element('mi', '{'), mtable()))).toBe(false);
  });

  it('rejects a row whose second child is not a table', () => {
    expect(LinearSystemPattern.matches(mrow(openingBrace(), element('mi', 'x')))).toBe(false);
  });

  it('rejects a row whose third child is a non-empty operator', () => {
    expect(LinearSystemPattern.matches(mrow(openingBrace(), mtable(), element('mo', '}')))).toBe(false);
  });

  it('rejects a row whose third child is not an operator', () => {
    expect(LinearSystemPattern.matches(mrow(openingBrace(), mtable(), element('mi', '')))).toBe(false);
  });

  it('rejects rows with too few or too many children', () => {
    expect(LinearSystemPattern.matches(mrow(openingBrace()))).toBe(false);
    expect(LinearSystemPattern.matches(mrow(openingBrace(), mtable(), emptyMo(), element('mi', 'x')))).toBe(false);
  });
});
