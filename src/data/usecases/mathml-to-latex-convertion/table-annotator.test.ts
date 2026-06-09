import { TableAnnotator } from './table-annotator';
import { MathMLElement } from '../../protocols/mathml-element';

const element = (name: string, children: MathMLElement[] = [], value = ''): MathMLElement => ({
  name,
  value,
  children,
  attributes: {},
});

const mtable = (...children: MathMLElement[]): MathMLElement => element('mtable', children);
const mtr = (...children: MathMLElement[]): MathMLElement => element('mtr', children);
const mtd = (...children: MathMLElement[]): MathMLElement => element('mtd', children);
const math = (...children: MathMLElement[]): MathMLElement => element('math', children);

describe('TableAnnotator', () => {
  it('flags a table with no wrapping path as a bare table', () => {
    const table = mtable(mtr(mtd(element('mn', [], '1'))));
    const root = math(table);

    new TableAnnotator(root).normalize();

    expect(table.attributes.bareTable).toBe('bareTable');
    expect(table.attributes.innerTable).toBeUndefined();
  });

  it('flags a table nested in another table as inner, and only the outer one as bare', () => {
    const inner = mtable(mtr(mtd(element('mn', [], '1'))));
    const outer = mtable(mtr(mtd(inner)));
    const root = math(outer);

    new TableAnnotator(root).normalize();

    expect(inner.attributes.innerTable).toBe('innerTable');
    expect(inner.attributes.bareTable).toBeUndefined();
    expect(outer.attributes.bareTable).toBe('bareTable');
  });

  it('does not flag a table wrapped by an mfenced ancestor', () => {
    const table = mtable(mtr(mtd(element('mn', [], '1'))));
    const root = math(element('mfenced', [table]));

    new TableAnnotator(root).normalize();

    expect(table.attributes.bareTable).toBeUndefined();
  });

  it('does not flag the table of a linear-system row', () => {
    const table = mtable(mtr(mtd(element('mi', [], 'x'))));
    const root = math(element('mrow', [element('mo', [], '{'), table]));

    new TableAnnotator(root).normalize();

    expect(table.attributes.bareTable).toBeUndefined();
  });

  it('flags a row with no mtable ancestor as a bare row', () => {
    const orphanRow = mtr(mtd(element('mi', [], 'a')));
    const tableRow = mtr(mtd(element('mi', [], 'b')));
    const root = math(element('mrow', [orphanRow]), mtable(tableRow));

    new TableAnnotator(root).normalize();

    expect(orphanRow.attributes.bareRow).toBe('bareRow');
    expect(tableRow.attributes.bareRow).toBeUndefined();
  });
});
