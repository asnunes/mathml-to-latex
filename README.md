# mathml-to-latex

It converts [MathML](https://en.wikipedia.org/wiki/MathML) to [LaTeX](https://pt.wikipedia.org/wiki/LaTeX).

## Instalation

If you use NPM

```
npm install mathml-to-latex --save
```

If you use Yarn

```
yarn add mathml-to-latex
```

## Usage

```javascript
const Mathml2latex = require('mathml-to-latex');

const mathml = `
      <math>
        <mrow>
          <mn>a</mn>
          <mo>+</mo>
          <mn>b</mn>
        </mrow>
      </math>
      `;

Mathml2latex.convert(mathml);
// => a + b
```

```javascript
const Mathml2latex = require('mathml-to-latex');

const mathml = `
    <math>
        <mrow>
            <mi>A</mi>
            <mo>=</mo>
            <mfenced open = "[" close="]">
            <mtable>
                <mtr>
                <mtd><mi>x</mi></mtd>
                <mtd><mi>y</mi></mtd>
                </mtr>
                <mtr>
                <mtd><mi>z</mi></mtd>
                <mtd><mi>w</mi></mtd>
                </mtr>
            </mtable>
            </mfenced>
        </mrow>
    </math>
    `;

Mathml2latex.convert(mathml);
// => A = \begin{bmatrix} x & y \\ z & w \end{bmatrix}
```
