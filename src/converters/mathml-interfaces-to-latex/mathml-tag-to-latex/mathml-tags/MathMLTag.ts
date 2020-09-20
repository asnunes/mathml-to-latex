export class MathMLTag {
  protected _name: string;
  protected _value: string;
  protected _attributes: Record<string, string>;
  protected _children: MathMLTag[];
  protected _flags: string[] = [];

  constructor(name: string, value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    this._name = name;
    this._value = value;
    this._attributes = attributes;
    this._children = children;
  }

  convert(): string {
    return this._mapChildrenToLaTeX().join('');
  }

  protected _mapChildrenToLaTeX(): string[] {
    return this._children.map((mathMLTag) => mathMLTag.convert());
  }

  protected _normalizeWhiteSpaces(str: string): string {
    return str.replace(/\s+/g, ' ');
  }

  isThere(className: string): boolean {
    const firstChild = this._children[0];
    if (!firstChild) return false;

    return firstChild.constructor.name === className || firstChild.isThere(className);
  }

  addFlag(flag: string): void {
    if (!this._flags.includes(flag)) this._flags.push(flag);
  }

  addFlagRecursiveIfClassName(className: string, flag: string): void {
    this._children.forEach((child) => {
      if (child.constructor.name === className) child.addFlag(flag);
      child.addFlagRecursiveIfClassName(className, flag);
    });
  }

  hasFlag(flag: string): boolean {
    return this._flags.includes(flag);
  }
}
