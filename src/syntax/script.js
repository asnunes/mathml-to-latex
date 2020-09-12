const allMathOperators = require('./allMathOperators');

const allMathOperatorsByChar = allMathOperators.reduce(
  (acc, val) => Object.assign({ [val.character]: val.latex }, acc),
  {},
);

console.log(JSON.stringify(allMathOperatorsByChar));
