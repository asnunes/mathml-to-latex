const allMathOperators = require('./allMathSymbols');

const allMathOperatorsByChar = allMathOperators.reduce(
  (acc, val) => Object.assign({ [val.glyph]: val.latex }, acc),
  {},
);

console.log(JSON.stringify(allMathOperatorsByChar));
