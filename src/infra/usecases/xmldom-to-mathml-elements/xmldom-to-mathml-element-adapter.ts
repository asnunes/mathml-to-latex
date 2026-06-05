import { DOMParser } from '@xmldom/xmldom';
import { ElementsToMathMLAdapter } from './xmldom-elements-to-mathml-elements-adapter';
import { ErrorHandler } from './error-handler';
import { MathMLElement } from '../../../data/protocols/mathml-element';

export class XmlToMathMLAdapter {
  private _xml = '';
  private readonly _xmlDOM: DOMParser;
  private readonly _errorHandler: ErrorHandler;
  private readonly _elementsConvertor: ElementsToMathMLAdapter;

  constructor(elementsConvertor: ElementsToMathMLAdapter, errorHandler: ErrorHandler) {
    this._elementsConvertor = elementsConvertor;
    this._errorHandler = errorHandler;

    // Since @xmldom/xmldom 0.9 the deprecated `errorHandler`/`locator` object
    // options were replaced by a single `onError(level, message)` callback.
    this._xmlDOM = new DOMParser({
      onError: (_level, message) => this._fixError(message),
    });
  }

  convert(xml: string): MathMLElement[] {
    this._xml = this._removeLineBreaks(xml);
    this._xml = this._removeMsWordPrefixes(this._xml);

    return this._elementsConvertor.convert(this._mathMLElements);
  }

  private _fixError(errorMessage: string): void {
    this._xml = this._errorHandler.fixError(this._xml, errorMessage);
  }

  private _removeLineBreaks(xml: string): string {
    const LINE_BREAK = /\n|\r\n|\r/g;
    return xml.replace(LINE_BREAK, '');
  }

  private _removeMsWordPrefixes(xml: string): string {
    const MS_WORD_PREFIX = /mml:/g;
    return xml.replace(MS_WORD_PREFIX, '');
  }

  private get _mathMLElements(): Element[] {
    let document = this._parse();
    if (this._errorHandler.isThereAnyErrors()) {
      this._errorHandler.cleanErrors();
      document = this._parse();
    }

    const elements = document?.getElementsByTagName('math');
    // xmldom 0.9 exposes its own Element type, which is structurally compatible
    // with the DOM Element used downstream but does not overlap for TS, so the
    // cast must go through `unknown`.
    return elements ? (Array.from(elements) as unknown as Element[]) : [];
  }

  private _parse(): ReturnType<DOMParser['parseFromString']> | undefined {
    try {
      return this._xmlDOM.parseFromString(this._xml, 'text/xml');
    } catch {
      // Since xmldom 0.9 a fatalError (e.g. a value-less attribute) aborts
      // parsing and is thrown as a ParseError. `onError` has already recorded
      // and fixed it on `this._xml`, so the caller re-parses the corrected XML.
      return undefined;
    }
  }
}
