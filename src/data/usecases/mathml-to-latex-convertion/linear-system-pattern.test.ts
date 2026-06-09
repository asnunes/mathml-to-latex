import { isLinearSystemPattern } from './linear-system-pattern';
import { MathMLElement } from '../../protocols/mathml-element';

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

describe('isLinearSystemPattern', () => {
  it('matches the 3-child shape: brace, table and empty closing operator', () => {
    expect(isLinearSystemPattern(mrow(openingBrace(), mtable(), emptyMo()))).toBe(true);
  });

  it('matches the 2-child MathJax shape: brace and table without closing operator', () => {
    expect(isLinearSystemPattern(mrow(openingBrace(), mtable()))).toBe(true);
  });

  it('matches when the brace value carries surrounding whitespace', () => {
    expect(isLinearSystemPattern(mrow(element('mo', ' { '), mtable(), element('mo', '  ')))).toBe(true);
  });

  it('rejects elements other than mrow', () => {
    expect(isLinearSystemPattern(element('mfenced', '', [openingBrace(), mtable()]))).toBe(false);
  });

  it('rejects a row whose first child is not an opening brace', () => {
    expect(isLinearSystemPattern(mrow(element('mo', '('), mtable()))).toBe(false);
    expect(isLinearSystemPattern(mrow(element('mi', '{'), mtable()))).toBe(false);
  });

  it('rejects a row whose second child is not a table', () => {
    expect(isLinearSystemPattern(mrow(openingBrace(), element('mi', 'x')))).toBe(false);
  });

  it('rejects a row whose third child is a non-empty operator', () => {
    expect(isLinearSystemPattern(mrow(openingBrace(), mtable(), element('mo', '}')))).toBe(false);
  });

  it('rejects a row whose third child is not an operator', () => {
    expect(isLinearSystemPattern(mrow(openingBrace(), mtable(), element('mi', '')))).toBe(false);
  });

  it('rejects rows with too few or too many children', () => {
    expect(isLinearSystemPattern(mrow(openingBrace()))).toBe(false);
    expect(isLinearSystemPattern(mrow(openingBrace(), mtable(), emptyMo(), element('mi', 'x')))).toBe(false);
  });
});
