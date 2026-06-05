/**
 * Recovers from the malformed-attribute errors commonly produced by MS Word
 * exports (e.g. `<mfenced open='{' close= >`). It inspects the parser error
 * message and rewrites the offending value-less attribute out of the XML so the
 * markup can be re-parsed successfully.
 */
export class ErrorHandler {
  private _errors: string[] = [];

  /**
   * If the parser error is a recoverable missing-attribute-value error, records
   * it and returns the XML with the offending attribute stripped; otherwise
   * returns the XML unchanged.
   *
   * @param xml - the current (possibly malformed) XML.
   * @param errorMessage - the message reported by the parser.
   * @returns the (possibly corrected) XML.
   */
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
    const missingAttribute = this._attributeNameFromError(errorMessage);
    if (missingAttribute) return xml.replace(this._matchMissingValueForAttribute(missingAttribute), '');

    while (this._mathGenericMissingValue().exec(xml)) {
      xml = xml.replace(this._mathGenericMissingValue(), '$1$3');
    }
    return xml;
  }

  // Only the "missed value" warning carries the offending attribute name. The
  // "AttValue: ' or \" expected" fatalError does not, so it falls back to the
  // generic strip above.
  private _attributeNameFromError(errorMessage: string): string | undefined {
    return errorMessage.match(/attribute "([^"]+)" missed value/)?.[1];
  }

  private _matchMissingValueForAttribute(attribute: string): RegExp {
    return new RegExp(`(${attribute}=(?!(\"|\')))|(${attribute}(?!(\"|\')))`, 'gm');
  }

  private _mathGenericMissingValue(): RegExp {
    return /(\<.* )(\w+=(?!\"|\'))(.*\>)/gm;
  }

  private _isMissingAttributeValueError(errorMessage: string): boolean {
    return (
      (!!errorMessage.includes('attribute') && !!errorMessage.includes('missed')) ||
      errorMessage.includes('attribute value missed') ||
      // Since xmldom 0.9 a value-less attribute written as `attr=` is reported
      // as this fatalError instead of a recoverable warning.
      errorMessage.includes('AttValue: \' or " expected')
    );
  }
}
