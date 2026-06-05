import { MathMLElementToLatexConverterAdapter } from './mathml-element-to-latex-converter-adapter';
import * as Converters from './converters';
import { MathMLElement } from '../../../data/protocols/mathml-element';

const element = (name: string): MathMLElement => ({ name, value: '', children: [], attributes: {} });

const converterFor = (el: MathMLElement | null) =>
  new MathMLElementToLatexConverterAdapter(el as MathMLElement).toLatexConverter();

describe('MathMLElementToLatexConverterAdapter', () => {
  it.each([
    ['math', Converters.Math],
    ['mfrac', Converters.MFrac],
    ['mi', Converters.MI],
    ['mtable', Converters.MTable],
    ['mover', Converters.GenericUnderOver],
    ['void', Converters.Void],
  ])('maps <%s> to its converter', (name, ConverterClass) => {
    expect(converterFor(element(name))).toBeInstanceOf(ConverterClass);
  });

  it('falls back to the generic spacing wrapper for an unknown tag', () => {
    expect(converterFor(element('munknown'))).toBeInstanceOf(Converters.GenericSpacingWrapper);
  });

  it('treats a null element as a void element', () => {
    expect(converterFor(null)).toBeInstanceOf(Converters.Void);
  });
});
