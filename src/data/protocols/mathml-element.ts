export interface MathMLElement {
  readonly name: string;
  readonly value: string;
  readonly children: MathMLElement[];
  attributes: Record<string, string>;
}

export class VoidMathMLElement implements MathMLElement {
  readonly name = 'void';
  readonly value = '';
  readonly children = [];
  attributes = {};
}
