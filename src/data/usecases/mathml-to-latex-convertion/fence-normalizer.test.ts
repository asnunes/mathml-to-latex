import { FenceNormalizer } from './fence-normalizer';
import { MathMLElement } from '../../protocols/mathml-element';

const el = (name: string, value = '', children: MathMLElement[] = []): MathMLElement => ({
  name,
  value,
  children,
  attributes: {},
});
const mo = (value: string): MathMLElement => el('mo', value);
const mi = (value: string): MathMLElement => el('mi', value);
const parent = (children: MathMLElement[]): MathMLElement => el('mrow', '', children);

describe('FenceNormalizer', () => {
  it('pairs sibling ( ) into an mfenced and passes a lone child directly', () => {
    const root = parent([mo('('), mi('x'), mo(')')]);

    new FenceNormalizer(root).normalize();

    expect(root.children).toHaveLength(1);
    const fenced = root.children[0];
    expect(fenced.name).toBe('mfenced');
    expect(fenced.attributes).toEqual({ open: '(', close: ')' });
    expect(fenced.children).toHaveLength(1);
    expect(fenced.children[0]).toMatchObject({ name: 'mi', value: 'x' });
  });

  it('wraps multi-node content in a single mrow to avoid separators', () => {
    const root = parent([mo('('), mi('a'), mo('+'), mi('b'), mo(')')]);

    new FenceNormalizer(root).normalize();

    const fenced = root.children[0];
    expect(fenced.name).toBe('mfenced');
    expect(fenced.children).toHaveLength(1);
    expect(fenced.children[0].name).toBe('mrow');
    expect(fenced.children[0].children.map((c) => c.value)).toEqual(['a', '+', 'b']);
  });

  it('nests pairs', () => {
    const root = parent([mo('('), mo('['), mi('a'), mo(']'), mo(')')]);

    new FenceNormalizer(root).normalize();

    expect(root.children).toHaveLength(1);
    const outer = root.children[0];
    expect(outer).toMatchObject({ name: 'mfenced', attributes: { open: '(', close: ')' } });
    const inner = outer.children[0];
    expect(inner).toMatchObject({ name: 'mfenced', attributes: { open: '[', close: ']' } });
    expect(inner.children[0]).toMatchObject({ name: 'mi', value: 'a' });
  });

  it('pairs mixed types (( with ])', () => {
    const root = parent([mo('('), mi('a'), mo(']')]);

    new FenceNormalizer(root).normalize();

    expect(root.children[0]).toMatchObject({ name: 'mfenced', attributes: { open: '(', close: ']' } });
  });

  it('leaves an unmatched opener untouched', () => {
    const root = parent([mo('('), mi('a')]);

    new FenceNormalizer(root).normalize();

    expect(root.children.map((c) => `${c.name}:${c.value}`)).toEqual(['mo:(', 'mi:a']);
  });

  it('leaves an unmatched closer untouched', () => {
    const root = parent([mi('a'), mo(')')]);

    new FenceNormalizer(root).normalize();

    expect(root.children.map((c) => `${c.name}:${c.value}`)).toEqual(['mi:a', 'mo:)']);
  });

  it('pairs a matched vertical bar pair (absolute value)', () => {
    const root = parent([mo('|'), mi('a'), mo('|')]);

    new FenceNormalizer(root).normalize();

    expect(root.children).toHaveLength(1);
    expect(root.children[0]).toMatchObject({ name: 'mfenced', attributes: { open: '|', close: '|' } });
    expect(root.children[0].children[0]).toMatchObject({ name: 'mi', value: 'a' });
  });

  it('toggles bars so consecutive pairs do not cross (|a| + |b|)', () => {
    const root = parent([mo('|'), mi('a'), mo('|'), mo('+'), mo('|'), mi('b'), mo('|')]);

    new FenceNormalizer(root).normalize();

    expect(root.children.map((c) => `${c.name}:${c.attributes.open ?? c.value}`)).toEqual([
      'mfenced:|',
      'mo:+',
      'mfenced:|',
    ]);
  });

  it('leaves an odd (unmatched) bar self-balanced', () => {
    const root = parent([mo('|'), mi('a'), mo('|'), mi('b'), mo('|')]);

    new FenceNormalizer(root).normalize();

    expect(root.children.map((c) => `${c.name}:${c.attributes.open ?? c.value}`)).toEqual([
      'mfenced:|',
      'mi:b',
      'mo:|',
    ]);
  });

  it('nests a bar pair inside parentheses and vice versa', () => {
    const parens = parent([mo('('), mo('|'), mi('x'), mo('|'), mo(')')]);
    new FenceNormalizer(parens).normalize();
    const outer = parens.children[0];
    expect(outer).toMatchObject({ name: 'mfenced', attributes: { open: '(', close: ')' } });
    expect(outer.children[0]).toMatchObject({ name: 'mfenced', attributes: { open: '|', close: '|' } });

    const bars = parent([mo('|'), mo('('), mi('x'), mo(')'), mo('|')]);
    new FenceNormalizer(bars).normalize();
    const outerBar = bars.children[0];
    expect(outerBar).toMatchObject({ name: 'mfenced', attributes: { open: '|', close: '|' } });
    expect(outerBar.children[0]).toMatchObject({ name: 'mfenced', attributes: { open: '(', close: ')' } });
  });

  it('leaves double bars untouched', () => {
    const root = parent([mo('||'), mi('a'), mo('||')]);

    new FenceNormalizer(root).normalize();

    expect(root.children.map((c) => `${c.name}:${c.value}`)).toEqual(['mo:||', 'mi:a', 'mo:||']);
  });

  it('descends into nested elements', () => {
    const root = parent([el('mfrac', '', [parent([mo('('), mi('x'), mo(')')]), mi('y')])]);

    new FenceNormalizer(root).normalize();

    const numerator = root.children[0].children[0];
    expect(numerator.children).toHaveLength(1);
    expect(numerator.children[0]).toMatchObject({ name: 'mfenced', attributes: { open: '(', close: ')' } });
  });

  it('handles deeply nested fences without overflowing the stack', () => {
    const depth = 20000;
    const openers = Array.from({ length: depth }, () => mo('('));
    const closers = Array.from({ length: depth }, () => mo(')'));
    const root = parent([...openers, mi('x'), ...closers]);

    expect(() => new FenceNormalizer(root).normalize()).not.toThrow();

    // Walk down the nested mfenced chain and confirm the full depth was paired.
    let node = root.children[0];
    let levels = 0;
    while (node && node.name === 'mfenced') {
      levels += 1;
      node = node.children[0];
    }
    expect(levels).toBe(depth);
    expect(node).toMatchObject({ name: 'mi', value: 'x' });
  });
});
