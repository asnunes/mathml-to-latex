export class ErrorHandler {
  private _errors: string[] = [];
  errorLocator = {};

  fixError(xml: string, errorMessage: string): string {
    if (!this._isMissingAttributeValueError(errorMessage)) return xml;

    this._errors.push(errorMessage);
    return this._fixMissingAttribute(errorMessage, xml);
  }

  isThereAnyErrors(): boolean {
    return this._errors.length > 0;
  }

  cleanErrors(): void {
    this._errors = [];
  }

  private _fixMissingAttribute(errorMessage: string, xml: string): string {
    const missingAttribute = errorMessage.split('"')[1];
    if (missingAttribute) return xml.replace(this._matchMissingValueForAttribute(missingAttribute), '');

    return xml.replace(this._mathGenericMissingValue(), '');
  }

  private _matchMissingValueForAttribute(attribute: string): RegExp {
    return new RegExp(`(?<=\<.*)(${attribute}=(?!(\"|\')))|(${attribute}(?!(\"|\')))(?=.*\>)`, 'gm');
  }

  private _mathGenericMissingValue(): RegExp {
    return /(?<=\<.*)(\w+=(?!(\"|\')))/gm;
  }

  private _isMissingAttributeValueError(errorMessage: string): boolean {
    return (
      (!!errorMessage.includes('attribute') && !!errorMessage.includes('missed')) ||
      errorMessage.includes('attribute value missed')
    );
  }
}
