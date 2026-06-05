/**
 * Joins a list of strings using a list of separators, one per gap. When there
 * are more gaps than separators the last separator is reused; when no
 * separators are given, `defaultSeparator` is used. Used by `<mfenced>` to honor
 * its `separators` attribute.
 */
export class JoinWithManySeparators {
  private _separators: string[];

  constructor(separators: string[]) {
    this._separators = separators;
  }

  /**
   * @param arr - the strings to join.
   * @param separators - the separators to place between items, in order.
   * @param defaultSeparator - separator used when `separators` is empty.
   * @returns the joined string.
   */
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
