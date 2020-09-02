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

export const mfencedWithBrokenAttribute = `
<root>
  <math>
  <mfenced open='{' close >
    <mn>3</mn>
  </mfenced>
  </math>
</root>
`;
