import * as ToLatexConverters from './converters';
import { MathMLElement, VoidMathMLElement } from '../../../data/protocols/mathml-element';
import { ToLaTeXConverter, ToLaTeXConverterClass } from '../../../domain/usecases/to-latex-converter';

export class MathMLElementToLatexConverterAdapter {
  private readonly _mathMLElement: MathMLElement;

  constructor(mathMLElement: MathMLElement) {
    this._mathMLElement = mathMLElement ?? new VoidMathMLElement();
  }

  toLatexConverter(): ToLaTeXConverter {
    const { name } = this._mathMLElement;
    const Converter = fromMathMLElementToLatexConverter[name] || ToLatexConverters.GenericSpacingWrapper;

    return new Converter(this._mathMLElement);
  }
}

const fromMathMLElementToLatexConverter: Record<string, ToLaTeXConverterClass> = {
  math: ToLatexConverters.Math,
  mi: ToLatexConverters.MI,
  mo: ToLatexConverters.MO,
  mn: ToLatexConverters.MN,
  msqrt: ToLatexConverters.MSqrt,
  mfenced: ToLatexConverters.MFenced,
  mfrac: ToLatexConverters.MFrac,
  mroot: ToLatexConverters.MRoot,
  maction: ToLatexConverters.MAction,
  menclose: ToLatexConverters.MEnclose,
  merror: ToLatexConverters.MError,
  mphantom: ToLatexConverters.MPhantom,
  msup: ToLatexConverters.MSup,
  msub: ToLatexConverters.MSub,
  msubsup: ToLatexConverters.MSubsup,
  mmultiscripts: ToLatexConverters.MMultiscripts,
  mtext: ToLatexConverters.MText,
  munderover: ToLatexConverters.MUnderover,
  mtable: ToLatexConverters.MTable,
  mtr: ToLatexConverters.MTr,
  mover: ToLatexConverters.GenericUnderOver,
  munder: ToLatexConverters.GenericUnderOver,
  mrow: ToLatexConverters.GenericSpacingWrapper,
  mpadded: ToLatexConverters.GenericSpacingWrapper,
  void: ToLatexConverters.Void,
};
