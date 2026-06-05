import {
  XmlToMathMLAdapter,
  ElementsToMathMLAdapter,
  ErrorHandler,
} from '../../infra/usecases/xmldom-to-mathml-elements';

/**
 * Wires up and returns the parser that turns a MathML string into element
 * trees, with its element mapper and error handler.
 *
 * @returns a ready-to-use {@link XmlToMathMLAdapter}.
 */
export const makeToMathElementsConverter = (): XmlToMathMLAdapter => {
  const elementsToMathMLAdapter = new ElementsToMathMLAdapter();
  const errorHandler = new ErrorHandler();

  return new XmlToMathMLAdapter(elementsToMathMLAdapter, errorHandler);
};
