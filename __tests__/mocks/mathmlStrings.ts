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

export const mfencedWithNoSeparator = `
<root>
  <math>
  <mfenced>
    <mn>3</mn>
    <mn>2</mn>
    <mn>1</mn>
    <mn>7</mn>
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

export const mfencedWithEmptySeparatorAndPmatrix = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mfenced open="(" close=")" separators="">
    <mtable>
      <mtr>
        <mtd><msub><mi>x</mi><mn>1</mn></msub></mtd>
        <mtd><mi>A</mi></mtd>
      </mtr>
      <mtr>
        <mtd><msub><mi>x</mi><mn>2</mn></msub></mtd>
        <mtd><mi>B</mi></mtd>
      </mtr>
    </mtable>
  </mfenced>
</math>
`;

export const mtableWithEmptySeparatorAndLinearSystem = `
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mrow data-mjx-texclass="INNER">
    <mo data-mjx-texclass="OPEN">{</mo>
    <mtable columnalign="left left" columnspacing="1em" rowspacing=".2em">
      <mtr>
        <mtd>
          <mi>x</mi>
          <mo>+</mo>
          <mi>y</mi>
          <mo>=</mo>
          <mn>1</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mi>x</mi>
          <mo>−</mo>
          <mi>y</mi>
          <mo>=</mo>
          <mn>3</mn>
        </mtd>
      </mtr>
    </mtable>
    <mo data-mjx-texclass="CLOSE" fence="true" stretchy="true" symmetric="true"></mo>
  </mrow>
</math>
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

// Matrix patterns with mo delimiters (GitHub issue #41)
export const moVmatrixPattern = `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mo>|</mo>
    <mtable>
      <mtr>
        <mtd><mn>2</mn></mtd>
        <mtd/><mtd/>
      </mtr>
      <mtr>
        <mtd/><mtd><mn>3</mn></mtd><mtd/>
      </mtr>
      <mtr>
        <mtd/><mtd><mn>3</mn></mtd><mtd/>
      </mtr>
    </mtable>
    <mo>|</mo>
  </math>
</root>
`;

export const mrowVmatrixPattern = `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mo>|</mo>
      <mtable>
        <mtr>
          <mtd><mn>1</mn></mtd>
          <mtd><mn>2</mn></mtd>
        </mtr>
        <mtr>
          <mtd><mn>3</mn></mtd>
          <mtd><mn>4</mn></mtd>
        </mtr>
      </mtable>
      <mo>|</mo>
    </mrow>
  </math>
</root>
`;

export const moPmatrixPattern = `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mo>(</mo>
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>2</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>3</mn></mtd>
        <mtd><mn>4</mn></mtd>
      </mtr>
    </mtable>
    <mo>)</mo>
  </math>
</root>
`;

export const moBmatrixPattern = `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mo>[</mo>
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>2</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>3</mn></mtd>
        <mtd><mn>4</mn></mtd>
      </mtr>
    </mtable>
    <mo>]</mo>
  </math>
</root>
`;

export const moBigBmatrixPattern = `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mo>{</mo>
    <mtable>
      <mtr>
        <mtd><mn>1</mn></mtd>
        <mtd><mn>2</mn></mtd>
      </mtr>
      <mtr>
        <mtd><mn>3</mn></mtd>
        <mtd><mn>4</mn></mtd>
      </mtr>
    </mtable>
    <mo>}</mo>
  </math>
</root>
`;

export const mpaddedVmatrixPattern = `
<root>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mpadded>
      <mo>|</mo>
      <mtable>
        <mtr>
          <mtd><mn>5</mn></mtd>
          <mtd><mn>6</mn></mtd>
        </mtr>
      </mtable>
      <mo>|</mo>
    </mpadded>
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

export const msWordInput =
  '<mml:math xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"><mml:msub><mml:mrow><mml:mi>V</mml:mi></mml:mrow><mml:mrow><mml:mi>i</mml:mi></mml:mrow></mml:msub><mml:mfrac><mml:mrow><mml:mi mathvariant="normal">Δ</mml:mi><mml:msubsup><mml:mrow><mml:mi>C</mml:mi></mml:mrow><mml:mrow><mml:mi>A</mml:mi><mml:mo>,</mml:mo><mml:mi>i</mml:mi></mml:mrow><mml:mrow><mml:mi>t</mml:mi></mml:mrow></mml:msubsup></mml:mrow><mml:mrow><mml:mi mathvariant="normal">Δ</mml:mi><mml:mi>t</mml:mi></mml:mrow></mml:mfrac><mml:mo>=</mml:mo><mml:mrow><mml:munderover><mml:mo stretchy="false">∑</mml:mo><mml:mrow><mml:mi>j</mml:mi><mml:mo>=</mml:mo><mml:mi>k</mml:mi></mml:mrow><mml:mrow><mml:mi>N</mml:mi></mml:mrow></mml:munderover><mml:mrow><mml:msubsup><mml:mrow><mml:mi>G</mml:mi></mml:mrow><mml:mrow><mml:mi>i</mml:mi><mml:mo>,</mml:mo><mml:mi>j</mml:mi></mml:mrow><mml:mrow><mml:mi>D</mml:mi></mml:mrow></mml:msubsup><mml:mfenced separators="|"><mml:mrow><mml:msub><mml:mrow><mml:mi>C</mml:mi></mml:mrow><mml:mrow><mml:mi>A</mml:mi><mml:mo>,</mml:mo><mml:mi>j</mml:mi></mml:mrow></mml:msub><mml:mo>-</mml:mo><mml:msub><mml:mrow><mml:mi>C</mml:mi></mml:mrow><mml:mrow><mml:mi>A</mml:mi><mml:mo>,</mml:mo><mml:mi>i</mml:mi></mml:mrow></mml:msub></mml:mrow></mml:mfenced></mml:mrow></mml:mrow></mml:math>';

type InputExpectedPair = {
  input: string;
  expected: string;
  op: 'mi' | 'mo' | 'mn';
};

export const inputExpectedPairs = [
  {
    input: 'Ω',
    expected: '\\Omega',
    op: 'mi',
  },
  {
    input: '×',
    expected: '\\times',
    op: 'mo',
  },
  {
    input: '½',
    expected: '\\dfrac{1}{2}',
    op: 'mn',
  },
  {
    input: 'µ',
    expected: '\\mu',
    op: 'mi',
  },
  {
    input: 'θ',
    expected: '\\theta',
    op: 'mi',
  },
  {
    input: '✓',
    expected: '\\checkmark',
    op: 'mo',
  },
  {
    input: '〈',
    expected: '\\langle',
    op: 'mo',
  },
  {
    input: '⟨',
    expected: '\\langle',
    op: 'mo',
  },
  {
    input: '⟩',
    expected: '\\rangle',
    op: 'mo',
  },
  {
    input: '¼',
    expected: '\\dfrac{1}{4}',
    op: 'mn',
  },
  {
    input: '…',
    expected: '\\ldots',
    op: 'mo',
  },
  {
    input: 'ℏ',
    expected: '\\hbar',
    op: 'mi',
  },
  {
    input: 'ℜ',
    expected: '\\mathfrak{R}',
    op: 'mi',
  },
  {
    input: 'Ѳ',
    expected: '\\theta',
    op: 'mi',
  },
  {
    input: 'Ø',
    expected: '\\emptyset',
    op: 'mi',
  },
  {
    input: 'ϱ',
    expected: '\\varrho',
    op: 'mi',
  },
  {
    input: 'ϕ',
    expected: '\\phi',
    op: 'mi',
  },
  {
    input: 'T',
    expected: 'T',
    op: 'mi',
  },
  {
    input: '⋅',
    expected: '\\cdot',
    op: 'mo',
  },
  {
    input: 'P',
    expected: 'P',
    op: 'mi',
  },
  {
    input: '∞',
    expected: '\\infty',
    op: 'mo',
  },
  {
    input: '∇',
    expected: '\\nabla',
    op: 'mo',
  },
  {
    input: 'η',
    expected: '\\eta',
    op: 'mi',
  },
  {
    input: 'Å',
    expected: '\\mathring{A}',
    op: 'mi',
  },
  {
    input: 'θ',
    expected: '\\theta',
    op: 'mi',
  },
  {
    input: 'ɣ',
    expected: '\\gamma',
    op: 'mi',
  },
  {
    input: 'ћ',
    expected: '\\hbar',
    op: 'mi',
  },
  {
    input: 'Å',
    expected: '\\mathring{A}',
    op: 'mi',
  },
  {
    input: '⌊',
    expected: '\\lfloor',
    op: 'mo',
  },
  {
    input: 'π',
    expected: '\\pi',
    op: 'mi',
  },
  {
    input: '³',
    expected: '^{3}',
    op: 'mn',
  },
  {
    input: 'Ɛ',
    expected: '\\varepsilon',
    op: 'mi',
  },
  {
    input: '𝒟',
    expected: '\\mathcal{D}',
    op: 'mi',
  },
  {
    input: 'ℝ',
    expected: '\\mathbb{R}',
    op: 'mi',
  },
  {
    input: '²',
    expected: '^{2}',
    op: 'mn',
  },
  {
    input: 'ℒ',
    expected: '\\mathcal{L}',
    op: 'mi',
  },
  {
    input: '⁸',
    expected: '^{8}',
    op: 'mn',
  },
  {
    input: '⁷',
    expected: '^{7}',
    op: 'mn',
  },
  {
    input: 'ⅅ',
    expected: '\\_{D}',
    op: 'mi',
  },
  {
    input: '⌈',
    expected: '\\lceil',
    op: 'mo',
  },
  {
    input: '⌉',
    expected: '\\rceil',
    op: 'mo',
  },
  {
    input: 'ÿ',
    expected: '\\ddot{y}',
    op: 'mi',
  },
  {
    input: '●',
    expected: '\\circle',
    op: 'mo',
  },
  {
    input: '〗',
    expected: '\\)|',
    op: 'mo',
  },
  {
    input: '▫',
    expected: '\\square',
    op: 'mo',
  },
  {
    input: 'ω',
    expected: '\\omega',
    op: 'mi',
  },
  {
    input: 'ℱ',
    expected: '\\mathcal{F}',
    op: 'mi',
  },
  {
    input: '𝓞',
    expected: '\\mathcal{O}',
    op: 'mi',
  },
  {
    input: '𝑥',
    expected: 'x',
    op: 'mi',
  },
  {
    input: '𝑦',
    expected: 'y',
    op: 'mi',
  },
  {
    input: '𝑖',
    expected: 'i',
    op: 'mi',
  },
  {
    input: '𝑧',
    expected: 'z',
    op: 'mi',
  },
  {
    input: '𝑗',
    expected: 'j',
    op: 'mi',
  },
  {
    input: '𝑘',
    expected: 'k',
    op: 'mi',
  },
  {
    input: '𝐵',
    expected: '\\mathit{B}',
    op: 'mi',
  },
  {
    input: '𝓓',
    expected: '\\mathcal{D}',
    op: 'mi',
  },
  {
    input: '𝐷',
    expected: '\\mathit{D}',
    op: 'mi',
  },
  {
    input: '𝑚',
    expected: 'm',
    op: 'mi',
  },
  {
    input: '𝐼',
    expected: '\\mathit{I}',
    op: 'mi',
  },
  {
    input: '𝑇',
    expected: '\\mathit{T}',
    op: 'mi',
  },
  {
    input: '𝐾',
    expected: '\\mathit{K}',
    op: 'mi',
  },
  {
    input: '𝑒',
    expected: 'e',
    op: 'mi',
  },
  {
    input: '𝑟',
    expected: 'r',
    op: 'mi',
  },
  {
    input: '𝑉',
    expected: '\\mathit{V}',
    op: 'mi',
  },
  {
    input: '𝐴',
    expected: '\\mathit{A}',
    op: 'mi',
  },
  {
    input: '𝑃',
    expected: '\\mathit{P}',
    op: 'mi',
  },
  {
    input: '𝒞',
    expected: '\\mathcal{C}',
    op: 'mi',
  },
  {
    input: 'ɳ',
    expected: '\\eta',
    op: 'mi',
  },
  {
    input: 'Ν',
    expected: '\\nu',
    op: 'mi',
  },
  {
    input: 'ɳ',
    expected: '\\eta',
    op: 'mi',
  },
  {
    input: 'ⅈ',
    expected: 'i',
    op: 'mi',
  },
  {
    input: '⍵',
    expected: '\\omega',
    op: 'mi',
  },
  {
    input: 'ο',
    expected: 'o',
    op: 'mi',
  },
  {
    input: 'ƒ',
    expected: 'f',
    op: 'mi',
  },
  {
    input: '🇽',
    expected: 'x',
    op: 'mi',
  },
  {
    input: 'ℰ',
    expected: '\\mathcal{E}',
    op: 'mi',
  },
  {
    input: '𝑝',
    expected: 'p',
    op: 'mi',
  },
  {
    input: '𝑎',
    expected: 'a',
    op: 'mi',
  },
  {
    input: '𝑆',
    expected: '\\mathit{S}',
    op: 'mi',
  },
  {
    input: '𝑠',
    expected: 's',
    op: 'mi',
  },
  {
    input: '𝑜',
    expected: 'o',
    op: 'mi',
  },
  {
    input: '𝛽',
    expected: '\\beta',
    op: 'mi',
  },
  {
    input: '𝐶',
    expected: '\\mathit{C}',
    op: 'mi',
  },
  {
    input: '𝑡',
    expected: 't',
    op: 'mi',
  },
  {
    input: '𝑅',
    expected: '\\mathit{R}',
    op: 'mi',
  },
  {
    input: '𝑢',
    expected: 'u',
    op: 'mi',
  },
  {
    input: '𝑏',
    expected: 'b',
    op: 'mi',
  },
  {
    input: 'ℚ',
    expected: '\\mathbb{Q}',
    op: 'mi',
  },
  {
    input: 'ŷ',
    expected: '\\hat{y}',
    op: 'mi',
  },
  {
    input: '𝑀',
    expected: '\\mathit{M}',
    op: 'mi',
  },
  {
    input: '𝑐',
    expected: 'c',
    op: 'mi',
  },
  {
    input: '𝑛',
    expected: 'n',
    op: 'mi',
  },
  {
    input: '𝑣',
    expected: 'v',
    op: 'mi',
  },
  {
    input: '𝑔',
    expected: 'g',
    op: 'mi',
  },
  {
    input: ';',
    expected: ';',
    op: 'mi',
  },
  {
    input: '℘',
    expected: '\\wp',
    op: 'mi',
  },
  {
    input: '𝓕',
    expected: '\\mathcal{F}',
    op: 'mi',
  },
  {
    input: '൦',
    expected: '\\circ',
    op: 'mi',
  },
  {
    input: '𝔻',
    expected: '\\mathbb{D}',
    op: 'mi',
  },
  {
    input: '𝕽',
    expected: '\\mathcal{R}',
    op: 'mi',
  },
  {
    input: '┴',
    expected: '\\perp',
    op: 'mi',
  },
  {
    input: 'Ô',
    expected: '\\hat{O}',
    op: 'mi',
  },
  {
    input: '✕',
    expected: '\\times',
    op: 'mi',
  },
  {
    input: 'ɵ',
    expected: '\\theta',
    op: 'mi',
  },
  {
    input: 'ℕ',
    expected: '\\mathbb{N}',
    op: 'mi',
  },
  {
    input: 'β',
    expected: '\\beta',
    op: 'mi',
  },
  {
    input: '₀',
    expected: '_{0}',
    op: 'mn',
  },
  {
    input: '₁',
    expected: '_{1}',
    op: 'mn',
  },
  {
    input: '₂',
    expected: '_{2}',
    op: 'mn',
  },
  {
    input: '₃',
    expected: '_{3}',
    op: 'mn',
  },
  {
    input: '₄',
    expected: '_{4}',
    op: 'mn',
  },
  {
    input: '₅',
    expected: '_{5}',
    op: 'mn',
  },
  {
    input: '₆',
    expected: '_{6}',
    op: 'mn',
  },
  {
    input: '₇',
    expected: '_{7}',
    op: 'mn',
  },
  {
    input: '₈',
    expected: '_{8}',
    op: 'mn',
  },
  {
    input: '₉',
    expected: '_{9}',
    op: 'mn',
  },
  {
    input: '⟦',
    expected: '\\(|',
    op: 'mo',
  },
  {
    input: '⟧',
    expected: '\\)|',
    op: 'mo',
  },
  {
    input: 'Ê',
    expected: '\\hat{E}',
    op: 'mi',
  },
  {
    input: '‾',
    expected: '\\overline',
    op: 'mo',
  },
  {
    input: '→',
    expected: '\\rightarrow',
    op: 'mo',
  },
  {
    input: '∥',
    expected: '\\parallel',
    op: 'mo',
  },
  {
    input: '𝑄',
    expected: '\\mathit{Q}',
    op: 'mi',
  },
  {
    input: '𝑓',
    expected: 'f',
    op: 'mi',
  },
  {
    input: 'Ī',
    expected: '\\bar{I}',
    op: 'mi',
  },
  {
    input: '≈',
    expected: '\\approx',
    op: 'mo',
  },
  {
    input: '∣',
    expected: '\\mid',
    op: 'mo',
  },
  {
    input: '∢',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: 'Փ',
    expected: '\\Phi',
    op: 'mi',
  },
  {
    input: '∮',
    expected: '\\oint',
    op: 'mo',
  },
  {
    input: '∫',
    expected: '\\int',
    op: 'mo',
  },
  {
    input: '∑',
    expected: '\\sum',
    op: 'mo',
  },
  {
    input: '∏',
    expected: '\\prod',
    op: 'mo',
  },
  {
    input: '∂',
    expected: '\\partial',
    op: 'mo',
  },
  {
    input: '∀',
    expected: '\\forall',
    op: 'mo',
  },
  {
    input: '∃',
    expected: '\\exists',
    op: 'mo',
  },
  {
    input: '∈',
    expected: '\\in',
    op: 'mo',
  },
  {
    input: '∋',
    expected: '\\ni',
    op: 'mo',
  },
  {
    input: '∝',
    expected: '\\propto',
    op: 'mo',
  },
  {
    input: '⁹',
    expected: '^{9}',
    op: 'mn',
  },
  {
    input: '⎜',
    expected: '\\mid',
    op: 'mo',
  },
  {
    input: '⎻',
    expected: '-',
    op: 'mo',
  },
  {
    input: '𝑙',
    expected: 'l',
    op: 'mi',
  },
  {
    input: '𝑖',
    expected: 'i',
    op: 'mi',
  },
  {
    input: '𝔀',
    expected: 'w',
    op: 'mi',
  },
  {
    input: '»',
    expected: '\\gg',
    op: 'mo',
  },
  {
    input: 'ν',
    expected: '\\nu',
    op: 'mi',
  },
  {
    input: 'ħ',
    expected: '\\hbar',
    op: 'mo',
  },
  {
    input: 'ፈ',
    expected: '',
  },
  {
    input: '𝑑',
    expected: 'd',
    op: 'mi',
  },
  {
    input: '𝜋',
    expected: '\\pi',
    op: 'mi',
  },
  {
    input: '⦨',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: 'п',
    expected: '\\pi',
    op: 'mi',
  },
  {
    input: '⬆',
    expected: '\\uparrow',
    op: 'mo',
  },
  {
    input: '⬇',
    expected: '\\downarrow',
    op: 'mo',
  },
  {
    input: '⬅',
    expected: '\\leftarrow',
    op: 'mo',
  },
  {
    input: '⮕',
    expected: '\\rightarrow',
    op: 'mo',
  },
  {
    input: 'Є',
    expected: '\\epsilon',
    op: 'mi',
  },
  {
    input: '⇒',
    expected: '\\Rightarrow',
    op: 'mo',
  },
  {
    input: '⇔',
    expected: '\\Leftrightarrow',
    op: 'mo',
  },
  {
    input: '⇐',
    expected: '\\Leftarrow',
    op: 'mo',
  },
  {
    input: '⇑',
    expected: '\\Uparrow',
    op: 'mo',
  },
  {
    input: '⇓',
    expected: '\\Downarrow',
    op: 'mo',
  },
  {
    input: 'ˆ',
    expected: '\\hat',
    op: 'mo',
  },
  {
    input: '¸',
    expected: ',',
    op: 'mo',
  },
  {
    input: 'ế',
    expected: '\\hat{e}',
    op: 'mi',
  },
  {
    input: '⦪',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: '¢',
    expected: '\\cent',
    op: 'mi',
  },
  {
    input: '⎼',
    expected: '-',
    op: 'mo',
  },
  {
    input: '𝐹',
    expected: '\\mathit{F}',
    op: 'mi',
  },
  {
    input: '↓',
    expected: '\\downarrow',
    op: 'mo',
  },
  {
    input: 'Ι',
    expected: '\\mathit{I}',
    op: 'mi',
  },
  {
    input: 'δ',
    expected: '\\delta',
    op: 'mi',
  },
  {
    input: '⤹',
    expected: '\\downarrow',
    op: 'mo',
  },
  {
    input: '⤷',
    expected: '\\Rsh',
    op: 'mo',
  },
  {
    input: '⤶',
    expected: '\\Lsh',
    op: 'mo',
  },
  {
    input: '⤵',
    expected: '\\downarrow',
    op: 'mo',
  },
  {
    input: '⤴',
    expected: '\\uparrow',
    op: 'mo',
  },
  {
    input: '⤳',
    expected: '\\rightarrow',
    op: 'mo',
  },
  {
    input: '⤸',
    expected: '\\downarrow',
    op: 'mo',
  },
  {
    input: '⤺',
    expected: '\\leftarrow',
    op: 'mo',
  },
  {
    input: '⤻',
    expected: '\\rightarrow',
    op: 'mo',
  },
  {
    input: 'ă',
    expected: '\\breve{a}',
    op: 'mi',
  },
  {
    input: '⁵',
    expected: '^{5}',
    op: 'mn',
  },
  {
    input: 'Δ',
    expected: '\\Delta',
    op: 'mi',
  },
  {
    input: 'ő',
    expected: '\\H{o}',
    op: 'mi',
  },
  {
    input: 'Î',
    expected: '\\hat{I}',
    op: 'mi',
  },
  {
    input: '𝜓',
    expected: '\\psi',
    op: 'mi',
  },
  {
    input: '𝜑',
    expected: '\\varphi',
    op: 'mi',
  },
  {
    input: '√',
    expected: '\\sqrt{}',
    op: 'mo',
  },
  {
    input: '♥',
    expected: '\\heartsuit',
    op: 'mi',
  },
  {
    input: 'ϴ',
    expected: '\\theta',
    op: 'mi',
  },
  {
    input: '⁰',
    expected: '^{0}',
    op: 'mn',
  },
  {
    input: 'ɸ',
    expected: '\\phi',
    op: 'mi',
  },
  {
    input: 'є',
    expected: '\\epsilon',
    op: 'mi',
  },
  {
    input: 'ơ',
    expected: 'o',
    op: 'mi',
  },
  {
    input: 'О',
    expected: '0',
    op: 'mi',
  },
  {
    input: 'ม',
    expected: '\\mathbf{m}',
    op: 'mi',
  },
  {
    input: 'Ė',
    expected: '\\dot{E}',
    op: 'mi',
  },
  {
    input: 'Υ',
    expected: 'Y',
    op: 'mi',
  },
  {
    input: 'ā',
    expected: '\\bar{a}',
    op: 'mi',
  },
  {
    input: '・',
    expected: '\\cdot',
    op: 'mo',
  },
  {
    input: 'х',
    expected: 'x',
    op: 'mi',
  },
  {
    input: 'ε',
    expected: '\\epsilon',
    op: 'mi',
  },
  {
    input: '𝜀',
    expected: '\\epsilon',
    op: 'mi',
  },
  {
    input: '𝑞',
    expected: 'q',
    op: 'mi',
  },
  {
    input: '¦',
    expected: '\\mid',
    op: 'mo',
  },
  {
    input: '𝞆',
    expected: '\\mathbf{X}',
    op: 'mi',
  },
  {
    input: '⋋',
    expected: '\\bowtie',
    op: 'mo',
  },
  {
    input: '⋊',
    expected: '\\ltimes',
    op: 'mo',
  },
  {
    input: '⋉',
    expected: '\\rtimes',
    op: 'mo',
  },
  {
    input: '⋈',
    expected: '\\Join',
    op: 'mo',
  },
  {
    input: 'φ',
    expected: '\\varphi',
    op: 'mi',
  },
  {
    input: '£',
    expected: '\\pounds',
    op: 'mo',
  },
  {
    input: '⦫',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: '⦪',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: '⦩',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: '↑',
    expected: '\\uparrow',
    op: 'mo',
  },
  {
    input: '▱',
    expected: '\\square',
    op: 'mo',
  },
  {
    input: '▰',
    expected: '\\blacksquare',
    op: 'mo',
  },
  {
    input: '▯',
    expected: '\\square',
    op: 'mo',
  },
  {
    input: '▮',
    expected: '\\blacksquare',
    op: 'mo',
  },
  {
    input: '▭',
    expected: '\\square',
    op: 'mo',
  },
  {
    input: 'Ε',
    expected: '\\mathbf{E}',
    op: 'mi',
  },
  {
    input: '≠',
    expected: '\\neq',
    op: 'mo',
  },
  {
    input: '≡',
    expected: '\\equiv',
    op: 'mo',
  },
  {
    input: '≤',
    expected: '\\leq',
    op: 'mo',
  },
  {
    input: '≥',
    expected: '\\geq',
    op: 'mo',
  },
  {
    input: '⊂',
    expected: '\\subset',
    op: 'mo',
  },
  {
    input: '⊃',
    expected: '\\supset',
    op: 'mo',
  },
  {
    input: '⊆',
    expected: '\\subseteq',
    op: 'mo',
  },
  {
    input: '⊇',
    expected: '\\supseteq',
    op: 'mo',
  },
  {
    input: '⦣',
    expected: '\\ulcorner',
    op: 'mo',
  },
  {
    input: '⦩',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: '⨮',
    expected: '\\bigodot',
    op: 'mo',
  },
  {
    input: '⟲',
    expected: '\\circlearrowleft',
    op: 'mo',
  },
  {
    input: '⟳',
    expected: '\\circlearrowright',
    op: 'mo',
  },
  {
    input: '⟵',
    expected: '\\leftarrow',
    op: 'mo',
  },
  {
    input: '⟶',
    expected: '\\rightarrow',
    op: 'mo',
  },
  {
    input: '℟',
    expected: '\\mathcal{R}',
    op: 'mi',
  },
  {
    input: 'α',
    expected: '\\alpha',
    op: 'mi',
  },
  {
    input: 'त',
    expected: '',
    op: 'mi',
  },
  {
    input: '↗',
    expected: '\\nearrow',
    op: 'mo',
  },
  {
    input: 'ṁ',
    expected: 'm',
    op: 'mi',
  },
  {
    input: '𝚵',
    expected: '\\Xi',
    op: 'mi',
  },
  {
    input: '𝐽',
    expected: '\\mathit{J}',
    op: 'mi',
  },
  {
    input: '◻',
    expected: '\\Box',
    op: 'mo',
  },
  {
    input: '𝑋',
    expected: '\\mathit{X}',
    op: 'mi',
  },
  {
    input: '𝑌',
    expected: '\\mathit{Y}',
    op: 'mi',
  },
  {
    input: 'Ф',
    expected: '\\Phi',
    op: 'mi',
  },
  {
    input: '⍬',
    expected: '\\theta',
    op: 'mi',
  },
  {
    input: 'τ',
    expected: '\\tau',
    op: 'mi',
  },
  {
    input: 'Β',
    expected: '\\mathsf{B}',
    op: 'mi',
  },
  {
    input: '⧸',
    expected: '/',
    op: 'mo',
  },
  {
    input: '⧹',
    expected: '\\backslash',
    op: 'mo',
  },
  {
    input: '⊤',
    expected: '\\top',
    op: 'mo',
  },
  {
    input: 'Ō',
    expected: '\\bar{O}',
    op: 'mi',
  },
  {
    input: '¥',
    expected: '\\yen',
    op: 'mo',
  },
  {
    input: '⁽',
    expected: '^{(}',
    op: 'mo',
  },
  {
    input: '⁾',
    expected: '^{)}',
    op: 'mo',
  },
  {
    input: '⦇',
    expected: '\\(|',
    op: 'mo',
  },
  {
    input: '⦈',
    expected: '|\\)',
    op: 'mo',
  },
  {
    input: '∅',
    expected: '\\emptyset',
    op: 'mo',
  },
  {
    input: '①',
    expected: '\\textcircled{1}',
    op: 'mi',
  },
  {
    input: '②',
    expected: '\\textcircled{2}',
    op: 'mi',
  },
  {
    input: '③',
    expected: '\\textcircled{3}',
    op: 'mi',
  },
  {
    input: '④',
    expected: '\\textcircled{4}',
    op: 'mi',
  },
  {
    input: '⑤',
    expected: '\\textcircled{5}',
    op: 'mi',
  },
  {
    input: '⑥',
    expected: '\\textcircled{6}',
    op: 'mi',
  },
  {
    input: '⑦',
    expected: '\\textcircled{7}',
    op: 'mi',
  },
  {
    input: '⑧',
    expected: '\\textcircled{8}',
    op: 'mi',
  },
  {
    input: '⑨',
    expected: '\\textcircled{9}',
    op: 'mi',
  },
  {
    input: '⑩',
    expected: '\\textcircled{10}',
    op: 'mi',
  },
  {
    input: '⑪',
    expected: '\\textcircled{11}',
    op: 'mi',
  },
  {
    input: '⑫',
    expected: '\\textcircled{12}',
    op: 'mi',
  },
  {
    input: '⑬',
    expected: '\\textcircled{13}',
    op: 'mi',
  },
  {
    input: '⑭',
    expected: '\\textcircled{14}',
    op: 'mi',
  },
  {
    input: '⑮',
    expected: '\\textcircled{15}',
    op: 'mi',
  },
  {
    input: '⑯',
    expected: '\\textcircled{16}',
    op: 'mi',
  },
  {
    input: '⑰',
    expected: '\\textcircled{17}',
    op: 'mi',
  },
  {
    input: '⑱',
    expected: '\\textcircled{18}',
    op: 'mi',
  },
  {
    input: '⑲',
    expected: '\\textcircled{19}',
    op: 'mi',
  },
  {
    input: '⑳',
    expected: '\\textcircled{20}',
    op: 'mi',
  },
  {
    input: '⓪',
    expected: '\\textcircled{0}',
    op: 'mi',
  },
  {
    input: '𝑁',
    expected: '\\mathit{N}',
    op: 'mi',
  },
  {
    input: 'Ú',
    expected: '\\acute{U}',
    op: 'mi',
  },
  {
    input: '𝚟',
    expected: 'v',
    op: 'mi',
  },
  {
    input: '𝛟',
    expected: '\\varphi',
    op: 'mi',
  },
  {
    input: 'ß',
    expected: '\\ss',
    op: 'mi',
  },
  {
    input: '十',
    expected: '+',
    op: 'mo',
  },
  {
    input: '土',
    expected: '\\pm',
    op: 'mo',
  },
  {
    input: 'ʋ',
    expected: '\\upsilon',
    op: 'mi',
  },
  {
    input: 'ɭ',
    expected: '\\ell',
    op: 'mi',
  },
  {
    input: 'λ',
    expected: '\\lambda',
    op: 'mi',
  },
  {
    input: 'Ӷ',
    expected: '\\Gamma',
    op: 'mi',
  },
  {
    input: '⎥',
    expected: '\\mid',
    op: 'mo',
  },
  {
    input: 'ρ',
    expected: '\\rho',
    op: 'mi',
  },
  {
    input: 'ℙ',
    expected: '\\mathbb{P}',
    op: 'mi',
  },
  {
    input: '։',
    expected: ':',
    op: 'mo',
  },
  {
    input: 'Ћ',
    expected: '\\hbar',
    op: 'mi',
  },
  {
    input: 'ϕ',
    expected: '\\phi',
    op: 'mi',
  },
  {
    input: 'а',
    expected: 'a',
    op: 'mi',
  },
  {
    input: 'р',
    expected: 'p',
    op: 'mi',
  },
  {
    input: '𝓍',
    expected: 'x',
    op: 'mi',
  },
  {
    input: '𝓎',
    expected: 'y',
    op: 'mi',
  },
  {
    input: '𝓏',
    expected: 'z',
    op: 'mi',
  },
  {
    input: '𝓐',
    expected: '\\mathcal{A}',
    op: 'mi',
  },
  {
    input: '⦵',
    expected: '\\ominus',
    op: 'mo',
  },
  {
    input: '⦬',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: '⦮',
    expected: '\\measuredangle',
    op: 'mo',
  },
  {
    input: 'ö',
    expected: '\\ddot{o}',
    op: 'mi',
  },
  {
    input: '⊿',
    expected: '\\triangle',
    op: 'mo',
  },
  {
    input: '†',
    expected: '\\dagger',
    op: 'mo',
  },
  {
    input: '𝐻',
    expected: '\\mathit{H}',
    op: 'mi',
  },
  {
    input: '𝑤',
    expected: 'w',
    op: 'mi',
  },
  {
    input: '𝑂',
    expected: '\\mathit{O}',
    op: 'mi',
  },
  {
    input: '𝑈',
    expected: '\\mathit{U}',
    op: 'mi',
  },
  {
    input: 'เ',
    expected: '\\prime',
    op: 'mo',
  },
  {
    input: 'ü',
    expected: '\\ddot{u}',
    op: 'mi',
  },
  {
    input: '𝜆',
    expected: '\\lambda',
    op: 'mi',
  },
  {
    input: '«',
    expected: '\\ll',
    op: 'mo',
  },
  {
    input: '»',
    expected: '\\gg',
    op: 'mo',
  },
  {
    input: 'γ',
    expected: '\\gamma',
    op: 'mi',
  },
  {
    input: 'Α',
    expected: '\\mathsf{A}',
    op: 'mi',
  },
  {
    input: 'ⁿ',
    expected: '^{n}',
    op: 'mo',
  },
  {
    input: '∘',
    expected: '\\circ',
    op: 'mo',
  },
  {
    input: '⍴',
    expected: '\\rho',
    op: 'mi',
  },
  {
    input: '⦁',
    expected: '\\cdot',
    op: 'mo',
  },
  {
    input: '✔',
    expected: '\\checkmark',
    op: 'mo',
  },
  {
    input: '✗',
    expected: '\\times',
    op: 'mo',
  },
  {
    input: '&',
    expected: '\\&',
    op: 'mo',
  },
  {
    input: '&',
    expected: '\\&',
    op: 'mi',
  },
  {
    input: '‖',
    expected: '\\parallel',
    op: 'mo',
  },
  {
    input: '‖',
    expected: '\\parallel',
    op: 'mi',
  },
  {
    input: '│',
    expected: '\\mid',
    op: 'mo',
  },
  {
    input: '│',
    expected: '\\mid',
    op: 'mi',
  },
  {
    input: '%',
    expected: '\\%',
    op: 'mo',
  },
  {
    input: '%',
    expected: '\\%',
    op: 'mi',
  },
  {
    input: '“',
    expected: '\\text{``}',
    op: 'mo',
  },
  {
    input: '“',
    expected: '\\text{``}',
    op: 'mi',
  },
  {
    input: '”',
    expected: '\\"',
    op: 'mo',
  },
  {
    input: '”',
    expected: '\\"',
    op: 'mi',
  },
  {
    input: 'ñ',
    expected: '\\tilde{n}',
    op: 'mi',
  },
  {
    input: '〈',
    expected: '\\langle',
    op: 'mo',
  },
  {
    input: '〈',
    expected: '\\langle',
    op: 'mi',
  },
  {
    input: '〉',
    expected: '\\rangle',
    op: 'mo',
  },
  {
    input: '〉',
    expected: '\\rangle',
    op: 'mi',
  },
  {
    input: '$',
    expected: '\\$',
    op: 'mo',
  },
  {
    input: '$',
    expected: '\\$',
    op: 'mi',
  },
  {
    input: '#',
    expected: '\\#',
    op: 'mo',
  },
  {
    input: '#',
    expected: '\\#',
    op: 'mi',
  },
  {
    input: '℃',
    expected: '\\text{\\textdegree C}',
    op: 'mo',
  },
  {
    input: '℉',
    expected: '\\text{\\textdegree F}',
    op: 'mo',
  },
  {
    input: '℃',
    expected: '\\text{\\textdegree C}',
    op: 'mi',
  },
  {
    input: '℉',
    expected: '\\text{\\textdegree F}',
    op: 'mi',
  },
  {
    input: '⟨',
    expected: '\\langle',
    op: 'mo',
  },
  {
    input: '⟩',
    expected: '\\rangle',
    op: 'mo',
  },
  {
    input: 'ṽ',
    expected: '\\tilde{v}',
    op: 'mi',
  },
  {
    input: '⌊',
    expected: '\\lfloor',
    op: 'mo',
  },
  {
    input: 'π',
    expected: '\\pi',
    op: 'mi',
  },
  {
    input: '³',
    expected: '^{3}',
    op: 'mn',
  },
  {
    input: '⁰',
    expected: '^{0}',
    op: 'mo',
  },
  {
    input: '⁴',
    expected: '^{4}',
    op: 'mn',
  },
  {
    input: '⁶',
    expected: '^{6}',
    op: 'mn',
  },
  {
    input: '〗',
    expected: '\\)|',
    op: 'mo',
  },
  {
    input: '⌋',
    expected: '\\rfloor',
    op: 'mo',
  },
  {
    input: '█',
    expected: '\\blacksquare',
    op: 'mo',
  },
  {
    input: 'ĵ',
    expected: '\\hat{j}',
    op: 'mi',
  },
  {
    input: '¾',
    expected: '\\dfrac{3}{4}',
    op: 'mo',
  },
  {
    input: '𝓛',
    expected: '\\mathcal{L}',
    op: 'mi',
  },
  {
    input: '⟦',
    expected: '\\(|',
    op: 'mo',
  },
  {
    input: '⟧',
    expected: '\\)|',
    op: 'mo',
  },
  {
    input: '●',
    expected: '\\circle',
    op: 'mo',
  },
  {
    input: '●',
    expected: '\\circle',
    op: 'mi',
  },
  {
    input: '▫',
    expected: '\\square',
    op: 'mo',
  },
  {
    input: '▫',
    expected: '\\square',
    op: 'mi',
  },
  {
    input: '℧',
    expected: '\\mho',
    op: 'mo',
  },
  {
    input: '℧',
    expected: '\\mho',
    op: 'mi',
  },
  {
    input: 'ȷ',
    expected: '\\mathsf{J}',
    op: 'mi',
  },
  {
    input: '⌈',
    expected: '\\lceil',
    op: 'mo',
  },
  {
    input: '⌉',
    expected: '\\rceil',
    op: 'mi',
  },
  {
    input: '⌉',
    expected: '\\rceil',
    op: 'mo',
  },
  {
    input: 'ℇ',
    expected: '\\varepsilon',
    op: 'mi',
  },
  {
    input: '⁸',
    expected: '^{8}',
    op: 'mn',
  },
  {
    input: '⁷',
    expected: '^{7}',
    op: 'mn',
  },
  {
    input: '⁴',
    expected: '^{4}',
    op: 'mn',
  },
  {
    input: '𝟙',
    expected: '\\mathbb{1}',
    op: 'mi',
  },
  {
    input: 'θ',
    expected: '\\theta',
    op: 'mi',
  },
  {
    input: 'ẑ',
    expected: '\\hat{z}',
    op: 'mi',
  },
  {
    input: 'ⅇ',
    expected: '\\text{e}',
    op: 'mi',
  },
  {
    input: '∞',
    expected: '\\infty',
    op: 'mo',
  },
  {
    input: 'Κ',
    expected: '\\mathsf{K}',
    op: 'mi',
  },
  {
    input: 'ɼ',
    expected: 'r',
    op: 'mi',
  },
  {
    input: '₁',
    expected: '_{1}',
    op: 'mn',
  },
  {
    input: '₂',
    expected: '_{2}',
    op: 'mn',
  },
  {
    input: '₃',
    expected: '_{3}',
    op: 'mn',
  },
  {
    input: 'ω',
    expected: '\\omega',
    op: 'mi',
  },
  {
    input: '↛',
    expected: '\\nrightarrow',
    op: 'mo',
  },
  {
    input: '↛',
    expected: '\\nrightarrow',
    op: 'mi',
  },
  {
    input: '∣',
    expected: '\\mid',
    op: 'mo',
  },
  {
    input: '∣',
    expected: '\\mid',
    op: 'mi',
  },
  {
    input: 'ˆ',
    expected: '\\hat',
    op: 'mo',
  },
  {
    input: 'ˆ',
    expected: '\\hat{}',
    op: 'mi',
  },
  {
    input: '‾',
    expected: '\\overline',
    op: 'mo',
  },
  {
    input: '→',
    expected: '\\rightarrow',
    op: 'mo',
  },
  {
    input: '→',
    expected: '\\rightarrow',
    op: 'mi',
  },
  {
    input: '₀',
    expected: '_{0}',
    op: 'mn',
  },
  {
    input: '‡',
    expected: '\\ddagger',
    op: 'mo',
  },
  {
    input: '‡',
    expected: '\\ddagger',
    op: 'mi',
  },
  {
    input: '・',
    expected: '\\cdot',
    op: 'mo',
  },
  {
    input: '・',
    expected: '\\cdot',
    op: 'mi',
  },
  {
    input: '⁵',
    expected: '^{5}',
    op: 'mn',
  },
  {
    input: '▱',
    expected: '\\square',
    op: 'mo',
  },
  {
    input: '▱',
    expected: '\\square',
    op: 'mi',
  },
  {
    input: '∆',
    expected: '\\Delta',
    op: 'mo',
  },
  {
    input: '∆',
    expected: '\\Delta',
    op: 'mi',
  },
  {
    input: 'ἱ',
    expected: 'i',
    op: 'mi',
  },
  {
    input: '∡',
    expected: '\\measuredangle',
    op: 'mo',
  },
  { input: 'ϒ', expected: '\\Upsilon', op: 'mi' },
  { input: '↓', expected: '\\downarrow', op: 'mo' },
  { input: '↓', expected: '\\downarrow', op: 'mi' },
  { input: '↑', expected: '\\uparrow', op: 'mo' },
  { input: '↑', expected: '\\uparrow', op: 'mi' },
  { input: '»', expected: '\\gg', op: 'mo' },
  { input: '⊤', expected: '\\top', op: 'mo' },
  { input: '⊤', expected: '\\top', op: 'mi' },
  { input: '⧸', expected: '/', op: 'mo' },
  { input: '⧸', expected: '/', op: 'mi' },
  { input: '𝛿', expected: '\\delta', op: 'mi' },
  { input: '˳', expected: '\\cdot', op: 'mo' },
  { input: '˳', expected: '\\cdot', op: 'mi' },
  //ₙ
  { input: 'ₙ', expected: '_{n}', op: 'mn' },
  { input: 'ₙ', expected: '_{n}', op: 'mi' },
  { input: 'ₙ', expected: '_{n}', op: 'mo' },
  //β
  { input: 'β', expected: '\\beta', op: 'mi' },
  { input: 'β', expected: '\\beta', op: 'mo' },
  //։
  { input: '։', expected: ':', op: 'mo' },
  { input: '։', expected: ':', op: 'mi' },
  //⦪
  { input: '⦪', expected: '\\measuredangle', op: 'mo' },
  { input: '⦪', expected: '\\measuredangle', op: 'mi' },
  //⦩
  { input: '⦩', expected: '\\measuredangle', op: 'mo' },
  { input: '⦩', expected: '\\measuredangle', op: 'mi' },
  //⦫
  { input: '⦫', expected: '\\measuredangle', op: 'mo' },
  { input: '⦫', expected: '\\measuredangle', op: 'mi' },
  //⦁
  { input: '⦁', expected: '\\cdot', op: 'mo' },
  { input: '⦁', expected: '\\cdot', op: 'mi' },
  //ѳ
  { input: 'ѳ', expected: '\\theta', op: 'mi' },
  { input: 'ѳ', expected: '\\theta', op: 'mo' },
  //⦢
  { input: '⦢', expected: '\\measuredangle', op: 'mo' },
  { input: '⦢', expected: '\\measuredangle', op: 'mi' },
  //¸
  { input: '¸', expected: ',', op: 'mo' },
  { input: '¸', expected: ',', op: 'mi' },
  //𝜙
  { input: '𝜙', expected: '\\phi', op: 'mi' },
  { input: '𝜙', expected: '\\phi', op: 'mo' },
  //П
  { input: 'П', expected: '\\prod', op: 'mi' },
  { input: 'П', expected: '\\prod', op: 'mo' },
  //α
  { input: 'α', expected: '\\alpha', op: 'mi' },
  { input: 'α', expected: '\\alpha', op: 'mo' },
  //₆
  { input: '₆', expected: '_{6}', op: 'mn' },
  { input: '₆', expected: '_{6}', op: 'mi' },
  { input: '₆', expected: '_{6}', op: 'mo' },
  //о
  { input: 'о', expected: 'o', op: 'mi' },
  { input: 'о', expected: 'o', op: 'mo' },
  //≈
  { input: '≈', expected: '\\approx', op: 'mo' },
  { input: '≈', expected: '\\approx', op: 'mi' },
  //≤
  { input: '≤', expected: '\\leq', op: 'mo' },
  { input: '≤', expected: '\\leq', op: 'mi' },
  //ђ
  { input: 'ђ', expected: '\\hbar', op: 'mi' },
  { input: 'ђ', expected: '\\hbar', op: 'mo' },
  //Ʌ
  { input: 'Ʌ', expected: '\\Lambda', op: 'mi' },
  { input: 'Ʌ', expected: '\\Lambda', op: 'mo' },
  //土
  { input: '土', expected: '\\pm', op: 'mo' },
  { input: '土', expected: '\\pm', op: 'mi' },
  //⎼
  { input: '⎼', expected: '-', op: 'mo' },
  { input: '⎼', expected: '-', op: 'mi' },
  //十
  { input: '十', expected: '+', op: 'mo' },
  { input: '十', expected: '+', op: 'mi' },
  //γ
  { input: 'γ', expected: '\\gamma', op: 'mi' },
  { input: 'γ', expected: '\\gamma', op: 'mo' },
  //≠
  { input: '≠', expected: '\\neq', op: 'mo' },
  { input: '≠', expected: '\\neq', op: 'mi' },
  //←
  { input: '←', expected: '\\leftarrow', op: 'mo' },
  { input: '←', expected: '\\leftarrow', op: 'mi' },
  //।
  { input: '।', expected: '\\mid', op: 'mo' },
  { input: '।', expected: '\\mid', op: 'mi' },
  //€
  { input: '€', expected: '\\euro', op: 'mo' },
  { input: '€', expected: '\\euro', op: 'mi' },
  //˘
  { input: '˘', expected: '', op: 'mo' },
  { input: '˘', expected: '', op: 'mi' },
  //ρ
  { input: 'ρ', expected: '\\rho', op: 'mi' },
  { input: 'ρ', expected: '\\rho', op: 'mo' },
  //ῡ
  { input: 'ῡ', expected: '\\bar{u}', op: 'mi' },
  { input: 'ῡ', expected: '\\bar{u}', op: 'mo' },
  //∥
  { input: '∥', expected: '\\parallel', op: 'mo' },
  { input: '∥', expected: '\\parallel', op: 'mi' },
  //↔
  { input: '↔', expected: '\\leftrightarrow', op: 'mo' },
  { input: '↔', expected: '\\leftrightarrow', op: 'mi' },
  //√
  { input: '√', expected: '\\sqrt{}', op: 'mo' },
  { input: '√', expected: '\\sqrt{}', op: 'mi' },
  //φ
  { input: 'φ', expected: '\\varphi', op: 'mi' },
  { input: 'φ', expected: '\\varphi', op: 'mo' },
  //ȼ
  { input: 'ȼ', expected: 'c', op: 'mi' },
  { input: 'ȼ', expected: 'c', op: 'mo' },
  //𝞮
  { input: '𝞮', expected: '\\epsilon', op: 'mi' },
  { input: '𝞮', expected: '\\epsilon', op: 'mo' },
  //Δ
  { input: 'Δ', expected: '\\Delta', op: 'mi' },
  { input: 'Δ', expected: '\\Delta', op: 'mo' },
  //·
  { input: '·', expected: '\\cdot', op: 'mo' },
  { input: '·', expected: '\\cdot', op: 'mi' },
  //∅
  { input: '∅', expected: '\\emptyset', op: 'mo' },
  { input: '∅', expected: '\\emptyset', op: 'mi' },
  //⦬
  { input: '⦬', expected: '\\measuredangle', op: 'mo' },
  { input: '⦬', expected: '\\measuredangle', op: 'mi' },
  //⦮
  { input: '⦮', expected: '\\measuredangle', op: 'mo' },
  { input: '⦮', expected: '\\measuredangle', op: 'mi' },
  //⦭
  { input: '⦭', expected: '\\measuredangle', op: 'mo' },
  { input: '⦭', expected: '\\measuredangle', op: 'mi' },
  //«
  { input: '«', expected: '\\ll', op: 'mo' },
  { input: '«', expected: '\\ll', op: 'mi' },
  //₈
  { input: '₈', expected: '_{8}', op: 'mn' },
  { input: '₈', expected: '_{8}', op: 'mi' },
  { input: '₈', expected: '_{8}', op: 'mo' },
  //Ȧ
  { input: 'Ȧ', expected: '\\dot{A}', op: 'mi' },
  { input: 'Ȧ', expected: '\\dot{A}', op: 'mo' },
  //λ
  { input: 'λ', expected: '\\lambda', op: 'mi' },
  { input: 'λ', expected: '\\lambda', op: 'mo' },
  //Χ
  { input: 'Χ', expected: '\\mathsf{X}', op: 'mi' },
  { input: 'Χ', expected: '\\mathsf{X}', op: 'mo' },
] as InputExpectedPair[];
