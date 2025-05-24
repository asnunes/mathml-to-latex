export class JoinWithManySeparators {
  private _separators: string[];

  constructor(separators: string[]) {
    this._separators = separators;
  }

  static join(arr: string[], separators: string[], defaultSeparator: string = ''): string {
    const effectiveSeparators =
      separators.length > 0 ? separators : defaultSeparator !== undefined ? [defaultSeparator] : [];
    return new JoinWithManySeparators(effectiveSeparators)._join(arr);
  }

  private _join(arr: string[]): string {
    return arr.reduce((joinedStr, currentStr, currentIndex, strArr) => {
      const separator = currentIndex === strArr.length - 1 ? '' : this._get(currentIndex);
      return joinedStr + currentStr + separator;
    }, '');
  }

  private _get(index: number) {
    if (!this._separators[index]) return this._separators[this._separators.length - 1];
    return this._separators[index];
  }
}
