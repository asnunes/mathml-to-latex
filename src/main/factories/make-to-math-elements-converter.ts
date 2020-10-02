import { XmlToMathMLAdapter, ElementsToMathMLAdapter, ErrorHandler } from '@/infra/usecases/xmldom-to-mathml-elements';

export const makeToMathElementsConverter = (): XmlToMathMLAdapter => {
  const elementsToMathMLAdapter = new ElementsToMathMLAdapter();
  const errorHandler = new ErrorHandler();

  return new XmlToMathMLAdapter(elementsToMathMLAdapter, errorHandler);
};
