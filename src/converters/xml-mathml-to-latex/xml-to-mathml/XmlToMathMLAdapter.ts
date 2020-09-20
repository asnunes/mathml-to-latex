import xmldom = require('xmldom');

import { DOMParser } from 'xmldom';
import { ErrorHandler } from './ErrorHandler';
import { MathML } from '../../../interfaces/MathML';
import { ElementsToMathMLAdapter } from './ElementsToMathMLAdapter';

export class XmlToMathMLAdapter {
  private _xmlDOM: DOMParser;
  private _errorHandler: ErrorHandler;
  private _elementsConvertor: ElementsToMathMLAdapter;

  constructor(private _xml: string) {
    this._xml = this._removeLineBreaks(_xml);

    this._elementsConvertor = new ElementsToMathMLAdapter();
    this._errorHandler = new ErrorHandler();

    this._xmlDOM = new xmldom.DOMParser({
      locator: this._errorHandler.errorLocator,
      errorHandler: this._fixError.bind(this),
    });
  }

  convert(): MathML[] {
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
