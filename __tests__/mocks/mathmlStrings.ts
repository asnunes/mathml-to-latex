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

export const mfencedWithBrokenAttributeCase3 = `
<root>
<math>
<mfenced open='{' close >
  <mn>3</mn>
</mfenced>
<mfenced open='{' close >
  <mn>5</mn>
</mfenced>
</math>
</root>
`;

export const mfencedWithBrokenAttributeCase4 = `
<root>
<math>
<mfenced open='{' close= >
  <mn>3</mn>
</mfenced>
<mfenced open='{' close= >
  <mn>5</mn>
</mfenced>
</math>
</root>
`;

export const mfencedWithBrokenAttributeCase5 = `
<root>
<math>
<mfenced open='' close= >
  <mn>3</mn>
</mfenced>
</math>
</root>
`;

export const mrootWithMi = '<root><math><mi>a</mi></math></root>';

export const misWithSpace = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi mathvariant="normal">Δ</mi>
  <mi>x</mi>
</math>`;

export const miWithDoubleStruck = `
<math>
  <msup>
    <mrow>
      <mi mathvariant="double-struck">R</mi>
    </mrow>
    <mrow>
      <mi>n</mi>
    </mrow>
  </msup>
</math>
`;

export const misWithEmptySpace = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi></mi>
  <mi>x</mi>
  <mi></mi>
  <mi></mi>
</math>`;

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

export const moWithCharOperatorAndMi = `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mstyle displaystyle="true">
      <mi>a</mi>
      <mo>&#x21D2;</mo>
      <mi>b</mi>
    </mstyle>
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

export const mathWithEpsilonGlyph = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>d</mi>
  <mo>=</mo>
  <msup>
    <mrow>
      <mfenced separators="|">
        <mrow>
          <mfrac>
            <mrow>
              <msup>
                <mrow>
                  <mi>q</mi>
                </mrow>
                <mrow>
                  <mn>2</mn>
                </mrow>
              </msup>
              <mi>L</mi>
            </mrow>
            <mrow>
              <mn>2</mn>
              <mi>π</mi>
              <msub>
                <mrow>
                  <mi>ϵ</mi>
                </mrow>
                <mrow>
                  <mn>0</mn>
                </mrow>
              </msub>
              <mi>m</mi>
              <mi>g</mi>
            </mrow>
          </mfrac>
        </mrow>
      </mfenced>
    </mrow>
    <mrow>
      <mn>1</mn>
      <mo>/</mo>
      <mn>3</mn>
    </mrow>
  </msup>
</math>
`;

export const mathWithMuGlyph = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mn>2</mn>
  <mi>µ</mi>
  <mi>s</mi>
</math>
`;

export const mathWithCdotGlyph = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mtext>kg⋅m²</mtext>
</math>
`;

export const mathWithAlternative1 = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>E</mi>
  <mfenced separators="|">
    <mrow>
      <msub>
        <mrow>
          <mi>W</mi>
        </mrow>
        <mrow>
          <mi>ı</mi>
        </mrow>
      </msub>
    </mrow>
  </mfenced>
  <mo>=</mo>
  <mi>μ</mi>
</math>
`;

export const mathWithAlternativeSquare = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mn>2</mn>
  <mi>∎</mi>
  <mi>s</mi>
</math>
`;

// µ ϵ < > ⋅ ı ∎ Ω × ½ μ Ө ✓ 〈 ⟨ ⟩ ⟩ ¼ … ℏ ℜ ˚ Ѳ Ø ϱ @ ф Τ ∙ Ρ ∞ ᐁ ƞ Å θ ɣ ћ Å ⌊ π ³ Ɛ 𝒟 ℝ ² ℒ ⁸ ⁷ ⅅ ⌈ ⌉ ÿ ● 〗▫ ω ℱ 𝓞 𝑥 𝑦 𝑖 𝑧 𝑗 𝑘 𝐵 𝓓 𝐷 𝑚 𝐼 𝑇 𝐾 𝑒 𝑟 𝑉 𝐴 𝑃 𝒞 ɳ Ν ɳ ⅈ ⍵ ο ƒ 🇽 ℰ 𝑝 𝑎
// 𝑆 𝑠 𝑜 𝑜 𝛽 𝐶 𝑡 𝑅 𝑢 𝑏 ℚ ŷ 𝑀 𝑐 𝑛 𝑣 𝑔 ; ℘ 𝓕 ൦ 𝔻 𝕽 ┴ Ô ✕ ɵ ⁴ ℕ β ₀ ₁ ₂ ₃ ⟦ ⟧ Ê ‾ → ∥ 𝑄 𝑓 Ī ≈ ∣ ∢ Փ ∮ ⁹ ⎧ ⎢ ⎩ ⎜ ⎻ 𝑙 ς ⁻ ⁶ 𝔀 » ν ħ ፈ 𝑑 𝜋 ⦨ п ⬆ ∡ Є ˆ ¸ ế ⦪ ¢ ⎼ 𝐹 ↓ Ι δ ⤹ ⤸ ă ⁵ ⅇ
// Δ ő \u202c ⎨ Î 𝜓 √ ♥ ϴ ⁰ ѳ ⤻ ɸ ơ є О ม Ė Υ ā ・ х ε σ 𝞮 𝜀 𝑞 ¦ 𝞆 ⋋ φ £ ⦫ ↑ ▱ Ε ≠ ⦣ ⦩ ⨮ ⟲ ℟ α त ↗ ṁ 𝚵 𝐽 ◻ 𝛿 𝑋 𝑌 Ф ⍬ τ ≤ ₈ Β ⧸ \u200e ⊤ Ō ¥ ⁽ ∅ ① 𝑁 Ú 𝚟 𝛟 ß 十 土 ʋ ɭ ⟳ λ
// ₆ Ӷ ⎥ ρ ῡ ℙ ։ Ћ ϕ а р 𝓍 ⦵ ⦬ ⦮ ⦭ ö ⊿ ↛' † ђ 𝐻 𝑤 𝑂 𝑈 ȼ เ ü 𝜆 ⿱ 白 ⁾ « γ ℸ 퓰 Α ⁿ ∘ ⍴ ϒ ⦁ ✔ ✗

export const mathWithOtherCharacters = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>Ω</mi>
  <mi>×</mi>
  <mi>½</mi>
  <mi>μ</mi>
  <mi>Ө</mi>
  <mi>✓</mi>
  <mi>〈</mi>
  <mi>⟨</mi>
  <mi>⟩</mi>
  <mi>⟩</mi>
  <mi>¼</mi>
  <mi>…</mi>
  <mi>ℏ</mi>
  <mi>ℜ</mi>
  <mi>Ѳ</mi>
  <mi>Ø</mi>
  <mi>ϱ</mi>
  <mi>ф</mi>
  <mi>T</mi>
  <mi>∙</mi>
  <mi>Ρ</mi>
  <mi>∞</mi>
  <mi>ᐁ</mi>
  <mi>ƞ</mi>
  <mi>Å</mi>
  <mi>θ</mi>
  <mi>ɣ</mi>
  <mi>ћ</mi>
  <mi>Å</mi>
  <mi>⌊</mi>
  <mi>π</mi>
  <mi>³</mi>
  <mi>Ɛ</mi>
  <mi>𝒟</mi>
  <mi>ℝ</mi>
  <mi>²</mi>
  <mi>ℒ</mi>
  <mi>⁸</mi>
  <mi>⁷</mi>
  <mi>ⅅ</mi>
  <mi>⌈</mi>
  <mi>⌉</mi>
  <mi>ÿ</mi>
  <mi>●</mi>
  <mi>〗</mi>
  <mi>▫</mi>
  <mi>ω</mi>
  <mi>ℱ</mi>
  <mi>𝓞</mi>
  <mi>𝑥</mi>
  <mi>𝑦</mi>
  <mi>𝑖</mi> 
  <mi>𝑧</mi>
  <mi>𝑗</mi>
  <mi>𝑘</mi>
  <mi>𝐵</mi>
  <mi>𝓓</mi>
  <mi>𝐷</mi>
  <mi>𝑚</mi>
  <mi>𝐼</mi>
  <mi>𝑇</mi>
  <mi>𝐾</mi>
  <mi>𝑒</mi>
  <mi>𝑟</mi>
  <mi>𝑉</mi>
  <mi>𝐴</mi>
  <mi>𝑃</mi>
  <mi>𝒞</mi>
  <mi>ɳ</mi>
  <mi>Ν</mi>
  <mi>ɳ</mi>
  <mi>ⅈ</mi> 
  <mi>⍵</mi>
  <mi>ο</mi>
  <mi>ƒ</mi>
  <mi>🇽</mi>
  <mi>ℰ</mi>
  <mi>𝑝</mi>
  <mi>𝑎</mi>
  <mi>𝑆</mi>
  <mi>𝑠</mi>
  <mi>𝑜</mi>
  <mi>𝑜</mi>
  <mi>𝛽</mi>
  <mi>𝐶</mi>
  <mi>𝑡</mi>
  <mi>𝑅</mi>
  <mi>𝑢</mi>
  <mi>𝑏</mi>
  <mi>ℚ</mi>
  <mi>ŷ</mi>
  <mi>𝑀</mi>
  <mi>𝑐</mi>
  <mi>𝑛</mi>
  <mi>𝑣</mi>
  <mi>𝑔</mi>
  <mi>;</mi>
  <mi>℘</mi>
  <mi>𝓕</mi>
  <mn>൦</mn>
  <mi>𝔻</mi>
  <mi>𝕽</mi>
  <mi>┴</mi>
  <mi>Ô</mi>
  <mi>✕</mi>
  <mi>ɵ</mi>
  <mn>⁴</mn>
  <mi>ℕ</mi>
  <mi>β</mi>
  <mi>₀</mi>
  <mi>₁</mi>
  <mi>₂</mi>
  <mi>₃</mi>
  <mi>⟦</mi>
  <mi>⟧</mi>
  <mi>Ê</mi>
  <mi>‾</mi>
  <mi>→</mi>
  <mi>∥</mi>
  <mi>𝑄</mi>
  <mi>𝑓</mi>
  <mi>Ī</mi>
  <mi>≈</mi>
  <mi>∣</mi>
  <mi>∢</mi>
  <mi>Փ</mi>
  <mi>∮</mi>
  <mi>⁹</mi>
  <mi>⎧</mi>
  <mi>⎢</mi>
  <mi>⎩</mi>
  <mi>⎜</mi>
  <mi>⎻</mi>
  <mi>𝑙</mi>
  <mi>ς</mi>
  <mi>⁶</mi>
  <mi>𝔀</mi>
  <mi>»</mi>
  <mi>ν</mi>
  <mi>ħ</mi>
  <mi>ፈ</mi>
  <mi>𝑑</mi>
  <mi>𝜋</mi>
  <mi>⦨</mi>
  <mi>п</mi>
  <mi>⬆</mi>
  <mi>Є</mi>
  <mi>ˆ</mi>
  <mi>¸</mi>
  <mi>ế</mi>
  <mi>⦪</mi>
  <mi>¢</mi>
  <mi>⎼</mi>
  <mi>𝐹</mi>
  <mi>↓</mi>
  <mi>Ι</mi>
  <mi>δ</mi>
  <mi>⤹</mi>
  <mi>⤸</mi>
  <mi>ă</mi>
  <mi>⁵</mi>
  <mi>Δ</mi>
  <mi>ő</mi>
  <mi>⎨</mi>
  <mi>Î</mi>
  <mi>𝜓</mi>
  <mi>√</mi>
  <mi>♥</mi>
  <mi>ϴ</mi>
  <mi>⁰</mi>
  <mi>ѳ</mi>
  <mi>⤻</mi>
  <mi>ɸ</mi>
  <mi>є</mi>
  <mi>ơ</mi>
  <mi>О</mi>
  <mi>ม</mi>
  <mi>Ė</mi>
  <mi>Υ</mi>
  <mi>ā</mi>
  <mi>・</mi>
  <mi>х</mi>
  <mi>ε</mi>
  <mi>𝜀</mi>
  <mi>𝑞</mi>
  <mi>¦</mi>
  <mi>𝞆</mi>
  <mi>⋋</mi>
  <mi>φ</mi>
  <mi>£</mi>
  <mi>⦫</mi>
  <mi>↑</mi>
  <mi>▱</mi>
  <mi>Ε</mi>
  <mi>≠</mi>
  <mi>⦣</mi>
  <mi>⦩</mi>
  <mi>⨮</mi>
  <mi>⟲</mi>
  <mi>℟</mi>
  <mi>α</mi>
  <mi>त</mi>
  <mi>↗</mi>
  <mi>ṁ</mi>
  <mi>𝚵</mi>
  <mi>𝐽</mi>
  <mi>◻</mi>
  <mi>𝑋</mi>
  <mi>𝑌</mi>
  <mi>Ф</mi>
  <mi>⍬</mi>
  <mi>τ</mi>
  <mi>≤</mi>
  <mi>₈</mi>
  <mi>Β</mi>
  <mi>⧸</mi>
  <mi>⊤</mi>
  <mi>Ō</mi>
  <mi>¥</mi>
  <mi>⁽</mi>
  <mi>∅</mi>
  <mi>①</mi>
  <mi>𝑁</mi>
  <mi>Ú</mi>
  <mi>𝚟</mi>
  <mi>𝛟</mi>
  <mi>ß</mi>
  <mi>十</mi>
  <mi>土</mi>
  <mi>ʋ</mi>
  <mi>ɭ</mi>
  <mi>⟳</mi>
  <mi>λ</mi>
  <mi>₆</mi>
  <mi>Ӷ</mi>
  <mi>⎥/mi>
  <mi>ρ/mi>
  <mi>ῡ/mi>
  <mi>ℙ/mi>
  <mi>։/mi>
  <mi>Ћ/mi>
  <mi>ϕ/mi>
  <mi>а/mi>
  <mi>р/mi>
  <mi>𝓍/mi>
  <mi>⦵/mi>
  <mi>⦬/mi>
  <mi>⦮/mi>
  <mi>ö/mi>
  <mi>⊿/mi>
  <mi>↛'/mi>
  <mi>†/mi>
  <mi>ђ/mi>
  <mi>𝐻/mi>
  <mi>𝑤/mi>
  <mi>𝑂/mi>
  <mi>𝑈/mi>
  <mi>ȼ/mi>
  <mi>เ/mi>
  <mi>ü/mi>
  <mi>𝜆/mi>
  <mi>⁾/mi>
  <mi>«/mi>
  <mi>γ/mi>
  <mi>ℸ/mi>
  <mi>Α/mi>A 
  <mi>ⁿ/mi>
  <mi>∘/mi>
  <mi>⍴/mi>
  <mi>⦁/mi>
  <mi>✔/mi>
  <mi>✗/mi>
</math>
`;
