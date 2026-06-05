import { MathMLToLaTeX } from '../../src';
import { MaxDepthExceededError } from '../../src/data/errors';

/**
 * Security/robustness tests derived from issue #44 (vulnerable @xmldom/xmldom).
 *
 * The injection CVEs reported against xmldom 0.8.x live in its *serializer*
 * (XMLSerializer.serializeToString), which this library never calls — it only
 * parses. The tests below therefore focus on what is actually reachable through
 * the public `convert` API:
 *
 *  - hostile XML nodes (processing instructions) must not crash the converter;
 *  - injected markup inside CDATA / comments / doctype must not leak into the
 *    LaTeX output;
 *  - deeply nested input must not take down the process with an uncontrolled
 *    stack overflow (DoS).
 */
describe('#convert security and robustness', () => {
  describe('given hostile XML nodes', () => {
    it('does not crash on a processing instruction inside math', () => {
      const mathml = `<math><?foo bar?><mn>5</mn></math>`;

      expect(() => MathMLToLaTeX.convert(mathml)).not.toThrow();
    });

    it('still converts the surrounding math when a processing instruction is present', () => {
      const mathml = `<math><mrow><?foo bar?><mn>1</mn><mo>+</mo><mn>2</mn></mrow></math>`;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('1 + 2');
    });
  });

  describe('given injected markup that must not leak into the output', () => {
    it('does not leak markup smuggled through a CDATA section', () => {
      const mathml = `<math><mtext><![CDATA[]]><mn>9</mn>]]></mtext></math>`;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).not.toContain('<mn>');
      expect(result).not.toContain('9');
    });

    it('does not leak markup smuggled through a comment', () => {
      const mathml = `<math><mrow><!-- --><mn>1</mn> --><mo>+</mo><mn>2</mn></mrow></math>`;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('1 + 2');
    });

    it('does not leak markup smuggled through a doctype declaration', () => {
      const mathml = `<!DOCTYPE math [ <!ENTITY x "INJECTED"> ]><math><mn>7</mn></math>`;

      const result = MathMLToLaTeX.convert(mathml);

      expect(result).toBe('7');
    });
  });

  describe('given deeply nested input (denial of service)', () => {
    it('rejects deeply nested input with a domain error instead of crashing', () => {
      const depth = 20000;
      const inner = '<mrow>'.repeat(depth) + '<mn>1</mn>' + '</mrow>'.repeat(depth);
      const mathml = `<math>${inner}</math>`;

      // The depth guard must trip before the recursion can overflow the call
      // stack, so a controlled MaxDepthExceededError is raised, never a raw
      // RangeError (Maximum call stack size exceeded).
      expect(() => MathMLToLaTeX.convert(mathml)).toThrow(MaxDepthExceededError);
      expect(() => MathMLToLaTeX.convert(mathml)).not.toThrow(RangeError);
    });

    it('still converts input nested within the supported depth', () => {
      const depth = 100;
      const inner = '<mrow>'.repeat(depth) + '<mn>1</mn>' + '</mrow>'.repeat(depth);
      const mathml = `<math>${inner}</math>`;

      expect(() => MathMLToLaTeX.convert(mathml)).not.toThrow();
    });
  });
});
