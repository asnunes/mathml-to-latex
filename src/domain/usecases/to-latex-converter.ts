export interface ToLaTeXConverter {
  convert(): string;
}

export interface ToLaTeXConverterClass {
  new (...args: any): ToLaTeXConverter;
}
