export class ErrorHandler {
  private _errors: string[] = [];
  errorLocator = {};

  fixError(xml: string, errorMessage: string): string {
    if (!this._isMissingAttributeValueError(errorMessage)) return xml;

    this._errors.push(errorMessage);
    return this._fixMissingAttribute(errorMessage, xml);
  }

  private _fixMissingAttribute(errorMessage: string, xml: string): string {
    const missingAttribute = errorMessage.split('"')[1];
    return xml.replace(this._matchAttribute(missingAttribute), `${missingAttribute}='null'`);
  }

  private _matchAttribute(attribute: string): RegExp {
    return new RegExp(`(?<=\<.*)(${attribute}=(?!(\"|\')))|(${attribute}(?!(\"|\')))(?=.*\>)`, 'g');
  }

  private _isMissingAttributeValueError(errorMessage: string): boolean {
    return !!errorMessage.includes('attribute') && !!errorMessage.includes('missed');
  }
}
