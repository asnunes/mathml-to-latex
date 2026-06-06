import { Separators } from './separators';

/** Renders the converted children as a LaTeX matrix environment chosen from the open/close fences. */
export class Matrix {
  private readonly separators: Separators;
  private readonly _genericCommand = 'matrix';

  constructor(open: string, close: string) {
    this.separators = new Separators(open, close);
  }

  apply(latexContents: string[]): string {
    const command = this._command;
    const matrix = `\\begin{${command}}\n${latexContents.join('')}\n\\end{${command}}`;

    return command === this._genericCommand ? this.separators.wrap(matrix) : matrix;
  }

  private get _command(): string {
    if (this.separators.areParentheses()) return 'pmatrix';
    if (this.separators.areSquareBrackets()) return 'bmatrix';
    if (this.separators.areBrackets()) return 'Bmatrix';
    if (this.separators.areDivides()) return 'vmatrix';
    if (this.separators.areParallels()) return 'Vmatrix';
    if (this.separators.areNotEqual()) return this._genericCommand;
    return 'bmatrix';
  }
}
