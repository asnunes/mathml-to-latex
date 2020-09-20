export interface MathML {
  name: string;
  attributes: Record<string, string>;
  value: string;
  children: MathML[];
}
