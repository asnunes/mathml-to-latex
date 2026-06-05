import { ErrorHandler } from './error-handler';

describe('ErrorHandler', () => {
  it('leaves the XML untouched and records nothing for an unrelated error', () => {
    const handler = new ErrorHandler();
    expect(handler.fixError('<math></math>', 'some unrelated parse error')).toBe('<math></math>');
    expect(handler.isThereAnyErrors()).toBe(false);
  });

  it('strips a value-less attribute reported as a missed-value warning', () => {
    const handler = new ErrorHandler();
    const fixed = handler.fixError(
      "<mfenced open='{' close ></mfenced>",
      'attribute "close" missed value!! "close" instead!!',
    );
    expect(handler.isThereAnyErrors()).toBe(true);
    expect(fixed).not.toContain('close');
  });

  it('recovers from the AttValue fatalError of an `attr=` with no value', () => {
    const handler = new ErrorHandler();
    const fixed = handler.fixError("<mfenced open='{' close= ></mfenced>", 'AttValue: \' or " expected');
    expect(handler.isThereAnyErrors()).toBe(true);
    expect(fixed).not.toContain('close=');
  });

  it('clears recorded errors', () => {
    const handler = new ErrorHandler();
    handler.fixError('<x close ></x>', 'attribute "close" missed value');
    handler.cleanErrors();
    expect(handler.isThereAnyErrors()).toBe(false);
  });
});
