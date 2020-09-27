import xmldom = require('xmldom');

import { DOMParser } from 'xmldom';
import { ElementsToMathMLAdapter } from './xmldom-elements-to-mathml-elements-adapter';
import { ErrorHandler } from './error-handler';
import { MathMLElement } from '@/data/protocols/mathml-element';

export class XmlToMathMLAdapter {
  private _xml: string;
  private readonly _xmlDOM: DOMParser;
  private readonly _errorHandler: ErrorHandler;
  private readonly _elementsConvertor: ElementsToMathMLAdapter;

  constructor(xml: string) {
    this._xml = this._removeLineBreaks(xml);

    this._elementsConvertor = new ElementsToMathMLAdapter();
    this._errorHandler = new ErrorHandler();

    this._xmlDOM = new xmldom.DOMParser({
      locator: this._errorHandler.errorLocator,
      errorHandler: this._fixError.bind(this),
    });
  }

  convert(): MathMLElement[] {
    return this._elementsConvertor.convert(this._mathMLElements);
  }

  private _fixError(errorMessage: string): void {
    this._xml = this._errorHandler.fixError(this._xml, errorMessage);
  }

  private _removeLineBreaks(xml: string): string {
    const LINE_BREAK = /\n|\r\n|\r/g;
    return xml.replace(LINE_BREAK, '');
  }

  private get _mathMLElements(): Element[] {
    const elements = this._xmlDOM.parseFromString(this._xml).getElementsByTagName('math');
    return Array.from(elements) as Element[];
  }
}
