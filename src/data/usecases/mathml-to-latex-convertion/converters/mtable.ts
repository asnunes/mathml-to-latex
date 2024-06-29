import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { mathMLElementToLaTeXConverter } from '../../../helpers';

export class MTable implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }
  // new method to turn string to numbers
  extractAndConvertNumbers(dimensionstring: string | undefined) {
    if (!dimensionstring) {
      //console.warn('dimensionString is undefined or null, default to 0.0');
      dimensionstring = '0.0, 0.0, 0.0, 0.0';
    }
    const numberPattern = /-?\d+(\.\d+)?([eE][+-]?\d+)?/g;
    const matches = dimensionstring.match(numberPattern);
    return matches ? matches.map((num) => parseFloat(num)) : [];
  }

  convert(): string {
    const tableContent = this._mathmlElement.children
      .map((child) => mathMLElementToLaTeXConverter(child))
      .map((converter) => converter.convert())
      .join(' \\\\\n');

    const Maxcol: number = this._mathmlElement.children
      .map((e: MathMLElement): number => e.children.length)
      .reduce((a: number, b: number) => (a >= b ? a : b));
    return this._wrapNestedTableContent(tableContent, Maxcol);
  }

  private _wrapNestedTableContent(latex: string, Maxcol: number): string {
    //Calculate how many ccc do we need
    const col = Array.from({ length: Maxcol })
      .map((e): string => 'c')
      .join('');

    //columnwidth
    const columnwidth = this._mathmlElement.attributes['columnwidth'];
    const widthValues = this.extractAndConvertNumbers(columnwidth);
    const columnwidthCm = widthValues.map((value) => value * 0.423);
    let TableRows = latex.split('\\\\');
    TableRows = TableRows.map((row) => {
      if (row.trim() !== '') {
        let columns = row.split('&');
        columns = columns.map((column, index) => {
          if (index < columnwidthCm.length) {
            return `\\hspace{${columnwidthCm[index]}cm}{${column}}`;
          }

          return column;
        });
        return columns.join('&');
      }
      return row;
    });
    latex = TableRows.join(' \\\\');

    //columnspacing
    const columnspacing = this._mathmlElement.attributes['columnspacing'];
    // 1 em = 0.423 cm
    const columnspacingValue = parseFloat(columnspacing);
    const columnspacingCm = isNaN(columnspacingValue) ? 0 : columnspacingValue * 0.423;
    let tableRows = latex.split('\\\\');

    // Process each row to add the horizontal space using \hspace
    tableRows = tableRows.map((row) => {
      if (row.trim() !== '') {
        let columns = row.split('&');

        // Add the \hspace between each column
        columns = columns.map((column, index) => {
          if (index < columns.length - 1)
            if (!/\\hspace{.*?}/.test(column)) {
              return `${column} \\hspace{${columnspacingCm}cm}`;
            } else {
              return column;
            }
          return column;
        });

        return columns.join('&');
      }
      return row;
    });

    latex = tableRows.join(' \\\\');

    // rowspacing
    const rowspacing = this._mathmlElement.attributes['rowspacing'];
    let rows = latex.split('\\\\');
    rows = rows.map((row) => {
      if (row.trim() !== '') {
        // Convert rowspacing from em to pt assuming 1em = 10pt (need furthur adjustment based on actual font size)
        const rowspacingPt: number = parseFloat(rowspacing || '0.0') * 10;
        // Add the \rule to the end of the row to create vertical space
        if (rowspacingPt === 0.0) {
          return `${row}`;
        } else {
          return `${row} \\rule{0pt}{${rowspacingPt}pt}`;
        }
      }
      return row;
    });
    latex = rows.join(' \\\\');
    //

    //rowlines
    const rowlines = this._mathmlElement.attributes['rowlines'];
    if (rowlines === 'solid') {
      let rows = latex.split('\\\\');

      // Add \hline to the end of each row and join them back together
      rows = rows.map((row) => row.trim() + '\\\\ \\hline');
      latex = rows.join(' \\\\');
    }

    //

    //columnlines
    const columnlines = this._mathmlElement.attributes['columnlines'];
    let columnSpec = col;
    if (columnlines === 'solid') {
      columnSpec = columnSpec.split('').join('|');
    }
    //

    // frame
    let hLine = '';
    const frame = this._mathmlElement.attributes['frame'];
    if (frame === 'solid') {
      columnSpec = '|' + columnSpec + '|';
      hLine = '\\hline';
    }
    //

    //framespacing
    const framespacing = this._mathmlElement.attributes['framespacing'];
    const spacingValues = this.extractAndConvertNumbers(framespacing);
    const horizontalSpacingEm = spacingValues[0] || 0;
    const verticalSpacingEx = spacingValues[1] || 0;
    let Tablerows = latex.split('\\\\');
    //         // Add vertical spacing to the first row
    if (Tablerows.length > 0) {
      Tablerows[0] = `\\rule{0pt}{${verticalSpacingEx}ex} ` + Tablerows[0];
    }
    //         // Add vertical spacing to the last row
    if (Tablerows.length > 1) {
      Tablerows[Tablerows.length - 1] += ` \\rule{0pt}{${verticalSpacingEx}ex}`;
    }
    Tablerows = Tablerows.map((row, rowIndex) => {
      if (row.trim() !== '') {
        let columns = row.split('&');

        // Add horizontal spacing to the first column if \hspace does not already exist
        if (!/\\hspace{.*?}/.test(columns[0])) {
          if (horizontalSpacingEm === 0) {
            return columns[0];
          }
          columns[0] = `\\hspace{${horizontalSpacingEm}em} ${columns[0]}`;
        }

        // Add horizontal spacing to the last column if \hspace does not already exist
        if (!/\\hspace{.*?}/.test(columns[columns.length - 1])) {
          if (horizontalSpacingEm === 0) {
            return columns[columns.length - 1];
          }
          columns[columns.length - 1] = `${columns[columns.length - 1]} \\hspace{${horizontalSpacingEm}em}`;
        }

        return columns.join('&');
      }
      return row;
    });

    latex = latex.replace(/\\hspace\{0cm}/g, '');

    const screen_output = `\\begin{array}{${columnSpec}}${hLine}${latex}\\end{array}`;
    return screen_output;
  }
}
