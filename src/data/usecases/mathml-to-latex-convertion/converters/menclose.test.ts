import { MEnclose } from './menclose';
import { MathMLElement } from '../../../protocols/mathml-element';

const mi = (v: string): MathMLElement => ({ name: 'mi', value: v, children: [], attributes: {} });
const menclose = (notation: string | undefined): MathMLElement => ({
  name: 'menclose',
  value: '',
  children: [mi('a')],
  attributes: notation ? { notation } : {},
});

describe('MEnclose', () => {
  it.each([
    ['box', '\\boxed{a}'],
    ['roundedbox', '\\boxed{a}'],
    ['circle', '\\boxed{a}'],
    ['top', '\\overline{a}'],
    ['bottom', '\\underline{a}'],
    ['left', '\\left|a'],
    ['right', 'a\\right|'],
    ['updiagonalstrike', '\\cancel{a}'],
    ['downdiagonalstrike', '\\bcancel{a}'],
    ['horizontalstrike', '\\hcancel{a}'],
  ])('wraps the content according to the %s notation', (notation, expected) => {
    expect(new MEnclose(menclose(notation)).convert()).toBe(expected);
  });
});
