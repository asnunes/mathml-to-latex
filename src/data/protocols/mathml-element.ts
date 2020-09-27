export interface MathMLElement {
  readonly name: string;
  readonly value: string;
  readonly children: MathMLElement[];
  attributes: Record<string, string>;
}
