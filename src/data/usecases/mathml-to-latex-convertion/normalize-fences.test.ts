import { normalizeFences } from './normalize-fences';
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

describe('normalizeFences', () => {
  it('pairs sibling ( ) into an mfenced and passes a lone child directly', () => {
    const root = parent([mo('('), mi('x'), mo(')')]);

    normalizeFences(root);

    expect(root.children).toHaveLength(1);
    const fenced = root.children[0];
    expect(fenced.name).toBe('mfenced');
    expect(fenced.attributes).toEqual({ open: '(', close: ')' });
    expect(fenced.children).toHaveLength(1);
    expect(fenced.children[0]).toMatchObject({ name: 'mi', value: 'x' });
  });

  it('wraps multi-node content in a single mrow to avoid separators', () => {
    const root = parent([mo('('), mi('a'), mo('+'), mi('b'), mo(')')]);

    normalizeFences(root);

    const fenced = root.children[0];
    expect(fenced.name).toBe('mfenced');
    expect(fenced.children).toHaveLength(1);
    expect(fenced.children[0].name).toBe('mrow');
    expect(fenced.children[0].children.map((c) => c.value)).toEqual(['a', '+', 'b']);
  });

  it('nests pairs', () => {
    const root = parent([mo('('), mo('['), mi('a'), mo(']'), mo(')')]);

    normalizeFences(root);

    expect(root.children).toHaveLength(1);
    const outer = root.children[0];
    expect(outer).toMatchObject({ name: 'mfenced', attributes: { open: '(', close: ')' } });
    const inner = outer.children[0];
    expect(inner).toMatchObject({ name: 'mfenced', attributes: { open: '[', close: ']' } });
    expect(inner.children[0]).toMatchObject({ name: 'mi', value: 'a' });
  });

  it('pairs mixed types (( with ])', () => {
    const root = parent([mo('('), mi('a'), mo(']')]);

    normalizeFences(root);

    expect(root.children[0]).toMatchObject({ name: 'mfenced', attributes: { open: '(', close: ']' } });
  });

  it('leaves an unmatched opener untouched', () => {
    const root = parent([mo('('), mi('a')]);

    normalizeFences(root);

    expect(root.children.map((c) => `${c.name}:${c.value}`)).toEqual(['mo:(', 'mi:a']);
  });

  it('leaves an unmatched closer untouched', () => {
    const root = parent([mi('a'), mo(')')]);

    normalizeFences(root);

    expect(root.children.map((c) => `${c.name}:${c.value}`)).toEqual(['mi:a', 'mo:)']);
  });

  it('leaves vertical bars untouched', () => {
    const root = parent([mo('|'), mi('a'), mo('|')]);

    normalizeFences(root);

    expect(root.children.map((c) => `${c.name}:${c.value}`)).toEqual(['mo:|', 'mi:a', 'mo:|']);
  });

  it('descends into nested elements', () => {
    const root = parent([el('mfrac', '', [parent([mo('('), mi('x'), mo(')')]), mi('y')])]);

    normalizeFences(root);

    const numerator = root.children[0].children[0];
    expect(numerator.children).toHaveLength(1);
    expect(numerator.children[0]).toMatchObject({ name: 'mfenced', attributes: { open: '(', close: ')' } });
  });
});
