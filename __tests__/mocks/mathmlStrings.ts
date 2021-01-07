export const singleMi = '<root><math><mi>a</mi></math></root>';

export const singleMiNoRoot = '<math><mi>b</mi></math>';

export const mrow = `
<root>
  <math>
    <mrow>
      <mn>2</mn>
      <mo>+</mo>
      <mn>2</mn>
    </mrow>
  </math>
</root>
`;

export const mfencedWithSeparatorAttribute = `
<root>
  <math>
  <mfenced separators=';;;'>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithBrokenAttributeCase1 = `
<root>
  <math>
  <mfenced open='{' close  >
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithBrokenAttributeCase2 = `
<root>
  <math>
  <mfenced open='{' close= >
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`;

export const mrootWithMi = '<root><math><mi>a</mi></math></root>';

export const mathWithMi = '<math><mi>b</mi></math>';

export const mathWithMiAndSpace = '<root><math><mi> a </mi></math></root>';

export const miWithEspecialChar = '<root><math><mi> &#x221E; </mi></math></root>';

export const emptyMi = '<root><math><mi>  </mi></math></root>';

export const moWithSimpleOperator = `
<root>
  <math>
    <mo>+</mo>
  </math>
</root>
`;

export const moDividerOperator = `
<math>
  <mi>x</mi>
  <mo>=</mo>
  <mn>4</mn>
  <mrow>
    <mo>/</mo>
  </mrow>
  <mn>5</mn>
</math>
`;

export const moWithGlyphOperator = `
<root>
  <math>
    <mo>*</mo>
  </math>
</root>
`;

export const moWithCharOperator = `
<root>
  <math>
    <mo>b</mo>
  </math>
</root>
`;

export const mrowWithMnAndMo = `
<root>
  <math>
    <mrow>
      <mn>2</mn>
      <mo>+</mo>
      <mn>2</mn>
    </mrow>
  </math>
</root>
`;

export const msqrt = `
<root>
  <math>
    <msqrt>
      <mn>2</mn>
    </msqrt>
  </math>
</root>
`;

export const msqrtWithWrappedContent = `
<root>
  <math>
    <msqrt>
      <mn>2</mn>
      <mo>+</mo>
      <mn>2</mn>
    </msqrt>
  </math>
</root>
`;

export const msqrtWithMrow = `
<root>
  <math>
    <msqrt>
      <mrow>
        <mn>2</mn>
        <mo>+</mo>
        <mn>2</mn>
      </mrow>
    </msqrt>
  </math>
</root>
`;

export const emptyMsqrt = `
<root>
  <math>
    <msqrt>
    </msqrt>
  </math>
</root>
`;

export const mfencedWithoutAttribute = `
<root>
  <math>
  <mfenced>
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithOpen = `
<root>
  <math>
  <mfenced open="{">
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithOpenAndClose = `
<root>
  <math>
  <mfenced open="(" close=")">
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithBrokenClose = `
<root>
  <math>
  <mfenced open="{" close>
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithWrappedContent = `
<root>
  <math>
  <mfenced>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithEmptySeparator = `
<root>
  <math>
  <mfenced separators=''>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
    <mn>7</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithSeparator = `
<root>
  <math>
  <mfenced separators=';;;'>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedWithDiffSeparators = `
<root>
  <math>
  <mfenced separators=';.'>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
    <mn>7</mn>
  </mfenced>
  </math>
</root>
`;

export const mfencedAsBmatrix = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
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
</root>
`;

export const mfencedAsPMatrix = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "(" close=")">
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
</root>
`;

export const mfencedAsVMatrix = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "|" close="|">
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
</root>
`;

export const mfencedAsBigBMatrix = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "{" close="}">
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
</root>
`;

export const mfencedAsBigVMatrix = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced open = "||" close="||">
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
</root>
`;

export const mfencedAsMatrix = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>A</mi>
      <mo>=</mo>
      <mfenced>
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
</root>
`;

export const mfencedAsPartialFunction = `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
    <mi>f</mi>
    <mfenced separators="|">
      <mrow>
        <mi>x</mi>
      </mrow>
    </mfenced>
    <mo>=</mo>
    <mfenced open="{" close="" separators="|">
      <mrow>
        <mtable>
          <mtr>
            <mtd>
              <mrow>
                <maligngroup></maligngroup>
                <msup>
                  <mrow>
                    <mi>x</mi>
                  </mrow>
                  <mrow>
                    <mn>2</mn>
                  </mrow>
                </msup>
                <mo>,</mo>
                <mi>x</mi>
                <mo>&lt;</mo>
                <mn>0</mn>
              </mrow>
            </mtd>
          </mtr>
          <mtr>
            <mtd>
              <mrow>
                <maligngroup></maligngroup>
                <msup>
                  <mrow>
                    <mi>e</mi>
                  </mrow>
                  <mrow>
                    <mi>x</mi>
                  </mrow>
                </msup>
                <mo>,</mo>
                <mi>x</mi>
                <mo>≥</mo>
                <mn>0</mn>
              </mrow>
            </mtd>
          </mtr>
        </mtable>
      </mrow>
    </mfenced>
  </math>
</root>
`;

export const mfencedWithNestedMtables = `
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mfenced separators="|">
    <mrow>
      <mtable>
        <mtr>
          <mtd>
            <mtable>
              <mtr>
                <mtd>
                  <msub>
                    <mrow>
                      <mi>a</mi>
                    </mrow>
                    <mrow>
                      <mn>11</mn>
                    </mrow>
                  </msub>
                </mtd>
                <mtd>
                  <msub>
                    <mrow>
                      <mi>a</mi>
                    </mrow>
                    <mrow>
                      <mn>12</mn>
                    </mrow>
                  </msub>
                </mtd>
              </mtr>
            </mtable>
          </mtd>
          <mtd>
            <mtable>
              <mtr>
                <mtd>
                  <mo>…</mo>
                </mtd>
                <mtd>
                  <mo>…</mo>
                </mtd>
              </mtr>
            </mtable>
          </mtd>
          <mtd>
            <msub>
              <mrow>
                <mi>a</mi>
              </mrow>
              <mrow>
                <mn>1</mn>
                <mi>n</mi>
              </mrow>
            </msub>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mtable>
              <mtr>
                <mtd>
                  <msub>
                    <mrow>
                      <mi>a</mi>
                    </mrow>
                    <mrow>
                      <mn>21</mn>
                    </mrow>
                  </msub>
                </mtd>
                <mtd>
                  <msub>
                    <mrow>
                      <mi>a</mi>
                    </mrow>
                    <mrow>
                      <mn>22</mn>
                    </mrow>
                  </msub>
                </mtd>
              </mtr>
            </mtable>
          </mtd>
          <mtd>
            <mtable>
              <mtr>
                <mtd>
                  <mo>⋱</mo>
                </mtd>
                <mtd>
                  <mi></mi>
                </mtd>
              </mtr>
            </mtable>
          </mtd>
          <mtd>
            <msub>
              <mrow>
                <mi>a</mi>
              </mrow>
              <mrow>
                <mn>2</mn>
                <mi>n</mi>
              </mrow>
            </msub>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mtable>
              <mtr>
                <mtd>
                  <mtable>
                    <mtr>
                      <mtd>
                        <mo>⋮</mo>
                        <mi></mi>
                        <mi></mi>
                        <mi></mi>
                        <mi></mi>
                      </mtd>
                      <mtd>
                        <mo>⋮</mo>
                      </mtd>
                    </mtr>
                  </mtable>
                </mtd>
              </mtr>
              <mtr>
                <mtd>
                  <mtable>
                    <mtr>
                      <mtd>
                        <msub>
                          <mrow>
                            <mi>a</mi>
                          </mrow>
                          <mrow>
                            <mi>m</mi>
                            <mn>1</mn>
                          </mrow>
                        </msub>
                      </mtd>
                      <mtd>
                        <msub>
                          <mrow>
                            <mi>a</mi>
                          </mrow>
                          <mrow>
                            <mi>m</mi>
                            <mn>2</mn>
                          </mrow>
                        </msub>
                      </mtd>
                    </mtr>
                  </mtable>
                </mtd>
              </mtr>
            </mtable>
          </mtd>
          <mtd>
            <mtable>
              <mtr>
                <mtd>
                  <mtable>
                    <mtr>
                      <mtd>
                        <mi></mi>
                      </mtd>
                      <mtd>
                        <mo>⋱</mo>
                      </mtd>
                    </mtr>
                  </mtable>
                </mtd>
              </mtr>
              <mtr>
                <mtd>
                  <mtable>
                    <mtr>
                      <mtd>
                        <mo>…</mo>
                      </mtd>
                      <mtd>
                        <mo>…</mo>
                      </mtd>
                    </mtr>
                  </mtable>
                </mtd>
              </mtr>
            </mtable>
          </mtd>
          <mtd>
            <mtable>
              <mtr>
                <mtd>
                  <mo>⋮</mo>
                </mtd>
              </mtr>
              <mtr>
                <mtd>
                  <msub>
                    <mrow>
                      <mi>a</mi>
                    </mrow>
                    <mrow>
                      <mi>m</mi>
                      <mi>n</mi>
                    </mrow>
                  </msub>
                </mtd>
              </mtr>
            </mtable>
          </mtd>
        </mtr>
      </mtable>
    </mrow>
  </mfenced>
  <mi></mi>
</math>
`;

export const mfrac = `
<root>
  <math>
    <mfrac>
      <mi>x</mi>
      <mn>3</mn>
    </mfrac>
  </math>
</root>
`;

export const mfracWithMrow = `
<root>
  <math>
    <mfrac>
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mrow>
        <mi>b</mi>
        <mo>-</mo>
        <mi>3</mi>
      </mrow>
    </mfrac>
  </math>
</root>
`;

export const shortMFrac = `
<root>
  <math>
    <mfrac bevelled="true">
      <mn>1</mn>
      <mrow>
        <msup>
          <mi>x</mi>
          <mn>3</mn>
        </msup>
        <mo>+</mo>
        <mn>3</mn>
      </mrow>
    </mfrac>
  </math>
</root>
`;

export const mfracWithThreeChildren = `
<root>
  <math>
    <mfrac>
      <mi>x</mi>
      <mn>3</mn>
      <mi>2</mi>
    </mfrac>
  </math>
</root>
`;

export const mroot = `
<root>
  <math>
    <mroot>
      <mrow>
        <mi>x</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mn>3</mn>
    </mroot> 
  </math>
</root>
`;

export const mrootWithThreeChildren = `
<root>
  <math>
    <mroot>
      <mrow>
        <mi>x</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mn>3</mn>
      <mn>2</mn>
    </mroot> 
  </math>
</root>
`;

export const mpadded = `
<root>
  <math>
    <mpadded>
      <mn>2</mn>
      <mo>+</mo>
      <mn>2</mn>
    </mpadded>
  </math>
</root>
`;

export const maction = `
<root>
  <math>
    <maction>
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mrow>
        <mi>b</mi>
        <mo>-</mo>
        <mi>3</mi>
      </mrow>
    </maction>
  </math>
</root>
`;

export const mactionWithMrow = `
<root>
  <math>
    <maction>
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mrow>
        <mi>b</mi>
        <mo>-</mo>
        <mi>3</mi>
      </mrow>
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>b</mi>
      </mrow>
    </maction>
  </math>
</root>
`;

export const mactionTypeToggle = `
<root>
  <math>
    <maction actiontype="toggle">
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mrow>
        <mi>b</mi>
        <mo>-</mo>
        <mi>3</mi>
      </mrow>
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>b</mi>
      </mrow>
    </maction>
  </math>
</root>
`;

export const mactionTypeStatusline = `
<root>
  <math>
    <maction actiontype="statusline">
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mrow>
        <mi>b</mi>
        <mo>-</mo>
        <mi>3</mi>
      </mrow>
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>b</mi>
      </mrow>
    </maction>
  </math>
</root>
`;

export const mactionTypeTooltip = `
<root>
  <math>
    <maction actiontype="tooltip">
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>2</mi>
      </mrow>
      <mrow>
        <mi>b</mi>
        <mo>-</mo>
        <mi>3</mi>
      </mrow>
      <mrow>
        <mi>a</mi>
        <mo>+</mo>
        <mi>b</mi>
      </mrow>
    </maction>
  </math>
</root>
`;

export const menclose = `
<root>
  <math>
    <menclose>
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationLongdiv = `
<root>
  <math>
    <menclose notation="longdiv">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationActuarial = `
<root>
  <math>
    <menclose notation="actuarial">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationRadical = `
<root>
  <math>
    <menclose notation="radical">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationBox = `
<root>
  <math>
    <menclose notation="box">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationRoundedBox = `
<root>
  <math>
    <menclose notation="roundedbox">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationCircle = `
<root>
  <math>
    <menclose notation="circle">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationLeft = `
<root>
  <math>
    <menclose notation="left">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationRight = `
<root>
  <math>
    <menclose notation="right">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationTop = `
<root>
  <math>
    <menclose notation="top">
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationBottom = `
<root>
  <math>
    <menclose notation="bottom">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationUpdiagnonalstrike = `
<root>
  <math>
    <menclose notation="updiagonalstrike">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationDowndiagnonalstrike = `
<root>
  <math>
    <menclose notation="downdiagonalstrike">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationHorizontalstrike = `
<root>
  <math>
    <menclose notation="horizontalstrike">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationVerticalstike = `
<root>
  <math>
    <menclose notation="verticalstrike">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationUpdiagnonalarrow = `
<root>
  <math>
    <menclose notation="updiagonalarrow">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationMadruwb = `
<root>
  <math>
    <menclose notation="madruwb">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const mencloseNotationPhasorangle = `
<root>
  <math>
    <menclose notation="phasorangle">
      <mi>a</mi>
      <mo>+</mo>
      <mi>2</mi>
    </menclose>
  </math>
</root>
`;

export const merror = `
<root>
  <math>
    <merror>
      <mi>2</mi>
      <mo>+</mo>
      <mi>2</mi>
    </merror>
  </math>
</root>
`;

export const mglyph = `
<root>
  <math>
    <mi><mglyph src="my-glyph.png" alt="my glyph"/></mi>
  </math>
</root>
`;

export const mphantom = `
<root>
  <math>
    <mrow>
      <mi> x </mi>
      <mo> + </mo>
      <mphantom>
        <mi> y </mi>
        <mo> + </mo>
      </mphantom>
      <mi> z </mi>
    </mrow>
  </math>
</root>
`;

export const msup = `
<root>
  <math>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
    </msup>
  </math>
</root>
`;

export const msupWithMrowOnTop = `
<root>
  <math>
    <msup>
      <mi>x</mi>
      <mrow>
        <mn>a</mn>
        <mo>+</mo>
        <mn>b</mn>
      </mrow>
    </msup>
  </math>
</root>
`;

export const msupWithMrowOnBottom = `
<root>
  <math>
    <msup>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mi>2</mi>
    </msup>
  </math>
</root>
`;

export const msupWithMrowOnTopBottom = `
<root>
  <math>
    <msup>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mrow>
        <mn>2</mn>
        <mo>+</mo>
        <mn>2</mn>
      </mrow>
    </msup>
  </math>
</root>
`;

export const msupWithThreeChildren = `
<root>
  <math>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
      <mn>3</mn>
    </msup>
  </math>
</root>
`;

export const msub = `
<root>
  <math>
    <msub>
      <mi>x</mi>
      <mn>2</mn>
    </msub>
  </math>
</root>
`;

export const msubWithMrowOnBottom = `
<root>
  <math>
    <msub>
      <mi>x</mi>
      <mrow>
        <mn>a</mn>
        <mo>+</mo>
        <mn>b</mn>
      </mrow>
    </msub>
  </math>
</root>
`;

export const msubWithMrowOnTop = `
<root>
  <math>
    <msub>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mi>2</mi>
    </msub>
  </math>
</root>
`;

export const msubWithMrowOnTopBottom = `
<root>
  <math>
    <msub>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mrow>
        <mn>2</mn>
        <mo>+</mo>
        <mn>2</mn>
      </mrow>
    </msub>
  </math>
</root>
`;

export const msubWithThreeChildren = `
<root>
  <math>
    <msub>
      <mi>x</mi>
      <mn>2</mn>
      <mn>3</mn>
    </msub>
  </math>
</root>
`;

export const msubsup = `
<root>
  <math>
    <msubsup>
      <mo> &#x222B; </mo>
      <mn> 0 </mn>
      <mn> 1 </mn>
    </msubsup>
  </math>
</root>
`;

export const msubsupWithMrow = `
<root>
  <math>
    <msubsup>
      <mrow>
        <mn>x</mn>
        <mo>+</mo>
        <mn>y</mn>
      </mrow>
      <mn> 0 </mn>
      <mn> 1 </mn>
    </msubsup>
  </math>
</root>
`;

export const msubsupWithFourChildren = `
<root>
  <math>
    <msubsup>
      <mo> &#x222B; </mo>
      <mn> 0 </mn>
      <mn> 1 </mn>
      <mn> 5 </mn>
    </msubsup>
  </math>
</root>
`;

export const mtext = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext> Theorem of Pythagoras </mtext>
  </math>
</root>
`;

export const mtextNormal = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="normal"> Theorem of Pythagoras </mtext>
  </math>
</root>
`;

export const mtextBold = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="bold"> Theorem of Pythagoras </mtext>
  </math>
</root>
`;

export const mtextItalic = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="italic"> Theorem of Pythagoras </mtext>
  </math>
</root>
`;

export const mtextBoldItalic = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="bold-italic"> Theorem of Pythagoras </mtext>
  </math>
</root>
`;

export const mtextDoubleStruck = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="double-struck">R</mtext>
  </math>
</root>
`;

export const mtextFraktur = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="fraktur">Creepy</mtext>
  </math>
</root>
`;

export const mtextBoldFraktur = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="bold-fraktur">Creepy</mtext>
  </math>
</root>
`;

export const mtextMonospace = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="monospace">simple text</mtext>
  </math>
</root>
`;

export const mtextScript = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="script">Creepy</mtext>
  </math>
</root>
`;

export const mtextBoldScript = `
<root>
  <math xmlns = "http://www.w3.org/1998/Math/MathML">
    <mtext mathvariant="bold-script">Creepy</mtext>
  </math>
</root>
`;

export const mtextMover = `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>⏞</mo>
    </mover>
  </math>
</root>
`;

export const moverMrow = `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>^</mo>
    </mover>
  </math>
</root>
`;

export const moverEncodedMo = `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>&#x2C6;</mo>
    </mover>
  </math>
</root>
`;

export const moverDoubleMrow = `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mrow>
        <mi> a </mi>
        <mo> + </mo>
        <mi> b </mi>
      </mrow>
    </mover>
  </math>
</root>
`;

export const moverThreeChildren = `
<root>
  <math>
    <mover accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo> + </mo>
      <mi> z </mi>
    </mover>
  </math>
</root>
`;

export const munder = `
<root>
  <math>
    <munder accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>⏟</mo>
    </munder>
  </math>
</root>
`;

export const munderDoubleMrow = `
<root>
  <math>
    <munder accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mrow>
        <mi> a </mi>
        <mo> + </mo>
        <mi> b </mi>
      </mrow>
    </munder>
  </math>
</root>
`;

export const munderEncodedMrow = `
<root>
  <math>
    <munder accent="true">
      <mrow>
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
        <mo> + </mo>
        <mi> z </mi>
      </mrow>
      <mo>&#x23DF;</mo>
    </munder>
  </math>
</root>
`;

export const munderover = `
<root>
  <math>
    <munderover>
      <mo> &#x222B;</mo>
      <mn> 0 </mn>
      <mn> 1 </mn>
    </munderover>
  </math>
</root>
`;

export const munderoverEncoded = `
<root>
  <math>
    <munderover>
      <mo> &#x222B;</mo>
      <mn> 0 </mn>
      <mi> &#x221E; </mi>
    </munderover>
  </math>
</root>
`;

export const munderoverWithThreeChildren = `
<root>
  <math>
    <munderover>
      <mo> &#x222B;</mo>
      <mn> 0 </mn>
      <mi> &#x221E; </mi>
      <mi> 1 </mi>
    </munderover>
  </math>
</root>
`;

export const mmultiscript = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
  <mrow>
    <mi>N</mi>
    <mi>a</mi>
  </mrow>
  <mrow>
    <mn>11</mn>
  </mrow>
  <mrow>
    <mi>+</mi>
  </mrow>
</mmultiscripts>
</math>`;

export const mmultiscriptNoSuper = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
  <mrow>
    <mi>N</mi>
    <mi>a</mi>
  </mrow>
  <mrow>
    <mn>11</mn>
  </mrow>
  <none/>
</mmultiscripts>
</math>`;

export const mmultiscriptNoSub = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
  <mrow>
    <mi>N</mi>
    <mi>a</mi>
  </mrow>
  <none/>
  <mrow>
    <mn>+</mn>
  </mrow>
</mmultiscripts>
</math>`;

export const mmultiscriptPreset = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>

  <mi>X</mi>      <!-- base expression -->  

  <mi>d</mi>      <!-- postsubscript -->
  <mi>c</mi>      <!-- postsuperscript -->

  <mprescripts />
  <mi>b</mi>      <!-- presubscript -->
  <mi>a</mi>      <!-- presuperscript -->

</mmultiscripts>
</math>`;

export const mmultiscriptPresetWithNone = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>

  <mi>X</mi>      <!-- base expression -->

  <none />        <!-- postsubscript -->
  <mi>c</mi>      <!-- postsuperscript -->

  <mprescripts />
  <mi>b</mi>      <!-- presubscript -->
  <none />        <!-- presuperscript -->

</mmultiscripts>
</math>`;

export const mmultiscriptPresetOnly = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
  <mi>X</mi>      <!-- base expression -->
  <mprescripts />
  <mi>b</mi>      <!-- presubscript -->
  <none />        <!-- presuperscript -->

</mmultiscripts>
</math>`;

export const mmultiscriptWithTwoChildren = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
<mmultiscripts>
  <mrow>
    <mi>N</mi>
    <mi>a</mi>
  </mrow>
  <mrow>
    <mn>11</mn>
  </mrow>
</mmultiscripts>
</math>`;
