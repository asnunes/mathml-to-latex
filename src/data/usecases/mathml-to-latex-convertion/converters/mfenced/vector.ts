import { GenericWrapper, JoinWithManySeparators } from '../../../../helpers';

/** Joins the converted children with the requested separators and wraps them in the open/close fences. */
export class Vector {
  private readonly open: string;
  private readonly close: string;

  constructor(
    open: string,
    close: string,
    private readonly separators: string[],
    private readonly defaultSeparator: string,
  ) {
    this.open = open || '(';
    this.close = close || ')';
  }

  apply(latexContents: string[]): string {
    const contentWithoutWrapper = JoinWithManySeparators.join(latexContents, this.separators, this.defaultSeparator);
    return new GenericWrapper(this.open, this.close).wrap(contentWithoutWrapper);
  }
}
