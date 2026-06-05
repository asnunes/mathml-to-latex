/**
 * Internal, parser-agnostic representation of a MathML node. The whole library
 * works on this tree rather than on DOM nodes, so the conversion logic is
 * decoupled from the XML parser.
 */
export interface MathMLElement {
  /** Tag name of the element (e.g. `mrow`, `mfrac`, `mi`). */
  readonly name: string;
  /** Text content of a leaf element; empty for elements that have children. */
  readonly value: string;
  /** Child elements, in document order. */
  readonly children: MathMLElement[];
  /** Element attributes as a plain map; mutable so the pipeline can flag nodes. */
  attributes: Record<string, string>;
}

/**
 * Null-object {@link MathMLElement} used as a safe fallback when no element is
 * available, so converters never have to guard against `null`/`undefined`.
 */
export class VoidMathMLElement implements MathMLElement {
  readonly name = 'void';
  readonly value = '';
  readonly children = [];
  attributes = {};
}
