export interface UTF8ToLtXConverter {
  convert(char: string): string;
}

/**
 * This class is used to convert some accents and special characters from utf-8 to latex math commands
 */
export class HashUTF8ToLtXConverter implements UTF8ToLtXConverter {
  public convert(char: string): string {
    const isAlphanumeric = char.match(/[a-z0-9]/i);
    if (isAlphanumeric) {
      return char;
    }

    const accentChar = vowelsWithAccents[char];
    if (accentChar) {
      const lxtCmd = this.convertAccentCharToLtX(accentChar);
      if (lxtCmd) {
        return lxtCmd;
      }

      return char;
    }

    const specialChar = this.convertSpecialCharToLtX(char);
    if (specialChar) {
      return specialChar;
    }

    return char;
  }

  private convertAccentCharToLtX(char: AccentChar): string | null {
    const { char: vowel, accent } = char;
    const cmd = accentToLTXCmd[accent];
    if (!cmd) {
      return null;
    }

    return `\\${cmd}{${vowel}}`;
  }

  private convertSpecialCharToLtX(char: string): string | null {
    const specialFontChar = specialFontChars[char];
    if (!specialFontChar) {
      return null;
    }

    const { letter, fontCmd } = specialFontChar;
    return `\\${fontCmd}{${letter}}`;
  }
}

type AccentChar = {
  char: Char;
  accent: Accent;
};

type Char =
  | 'a'
  | 'e'
  | 'i'
  | 'o'
  | 'u'
  | 'y'
  | 'A'
  | 'E'
  | 'I'
  | 'O'
  | 'U'
  | 'Y'
  | 'n'
  | 'N'
  | 'c'
  | 'C'
  | 'v'
  | 'V'
  | 'j'
  | 'J'
  | 'z'
  | 'Z';
type Accent = '´' | '`' | '^' | '~' | '¨' | 'ˆ' | '˚' | '˙' | '˘' | '˝' | 'ˇ' | 'ˆ' | '˜' | '-';
type LTXAccentCMD =
  | 'acute'
  | 'grave'
  | 'hat'
  | 'tilde'
  | 'ddot'
  | 'breve'
  | 'check'
  | 'dot'
  | 'mathring'
  | 'bar'
  | 'vec'
  | 'H';

const vowelsWithAccents: Record<string, AccentChar> = {
  á: { char: 'a', accent: '´' },
  à: { char: 'a', accent: '`' },
  â: { char: 'a', accent: '^' },
  ã: { char: 'a', accent: '~' },
  ä: { char: 'a', accent: '¨' },
  å: { char: 'a', accent: '˚' },
  ą: { char: 'a', accent: '˙' },
  ă: { char: 'a', accent: '˘' },
  ǎ: { char: 'a', accent: 'ˇ' },
  ǟ: { char: 'a', accent: 'ˆ' },
  ǻ: { char: 'a', accent: '˙' },
  ǡ: { char: 'a', accent: '-' },
  ā: { char: 'a', accent: '-' },
  é: { char: 'e', accent: '´' },
  è: { char: 'e', accent: '`' },
  ê: { char: 'e', accent: '^' },
  ë: { char: 'e', accent: '¨' },
  ę: { char: 'e', accent: '˙' },
  ě: { char: 'e', accent: 'ˇ' },
  ȇ: { char: 'i', accent: '^' },
  ё: { char: 'e', accent: '¨' },
  ē: { char: 'e', accent: '-' },
  í: { char: 'i', accent: '´' },
  ì: { char: 'i', accent: '`' },
  î: { char: 'i', accent: '^' },
  ï: { char: 'i', accent: '¨' },
  į: { char: 'i', accent: '˙' },
  ǐ: { char: 'i', accent: 'ˇ' },
  ȉ: { char: 'i', accent: '`' },
  ȋ: { char: 'i', accent: '¨' },
  ī: { char: 'i', accent: '-' },
  ó: { char: 'o', accent: '´' },
  ò: { char: 'o', accent: '`' },
  ô: { char: 'o', accent: '^' },
  õ: { char: 'o', accent: '~' },
  ö: { char: 'o', accent: '¨' },
  ő: { char: 'o', accent: '˝' },
  ǒ: { char: 'o', accent: 'ˇ' },
  ȍ: { char: 'o', accent: '`' },
  ȏ: { char: 'o', accent: '¨' },
  ȫ: { char: 'o', accent: '˘' },
  ȭ: { char: 'o', accent: '˝' },
  ȯ: { char: 'o', accent: '˙' },
  ō: { char: 'o', accent: '-' },
  ú: { char: 'u', accent: '´' },
  ù: { char: 'u', accent: '`' },
  û: { char: 'u', accent: '^' },
  ü: { char: 'u', accent: '¨' },
  ű: { char: 'u', accent: '˝' },
  ǔ: { char: 'u', accent: 'ˇ' },
  ǖ: { char: 'u', accent: '¨' },
  ǘ: { char: 'u', accent: '¨' },
  ǚ: { char: 'u', accent: '¨' },
  ǜ: { char: 'u', accent: '¨' },
  ȕ: { char: 'u', accent: '`' },
  ȗ: { char: 'u', accent: '¨' },
  ū: { char: 'u', accent: '-' },
  ý: { char: 'y', accent: '´' },
  ỳ: { char: 'y', accent: '`' },
  ŷ: { char: 'y', accent: '^' },
  ÿ: { char: 'y', accent: '¨' },
  ȳ: { char: 'y', accent: '-' },
  Á: { char: 'A', accent: '´' },
  À: { char: 'A', accent: '`' },
  Â: { char: 'A', accent: '^' },
  Ã: { char: 'A', accent: '~' },
  Ä: { char: 'A', accent: '¨' },
  Å: { char: 'A', accent: '˚' },
  Å: { char: 'A', accent: '˚' },
  Ȧ: { char: 'A', accent: '˙' },
  Ă: { char: 'A', accent: '˘' },
  Ǎ: { char: 'A', accent: 'ˇ' },
  Ǟ: { char: 'A', accent: '˝' },
  Ǻ: { char: 'A', accent: '˚' },
  Ǡ: { char: 'A', accent: '-' },
  Ā: { char: 'A', accent: '-' },
  É: { char: 'E', accent: '´' },
  È: { char: 'E', accent: '`' },
  Ė: { char: 'E', accent: '˙' },
  Ê: { char: 'E', accent: '^' },
  Ë: { char: 'E', accent: '¨' },
  Ě: { char: 'E', accent: 'ˇ' },
  Ȅ: { char: 'E', accent: '`' },
  Ȇ: { char: 'E', accent: '¨' },
  Ē: { char: 'E', accent: '-' },
  Í: { char: 'I', accent: '´' },
  Ì: { char: 'I', accent: '`' },
  Î: { char: 'I', accent: '^' },
  Ï: { char: 'I', accent: '¨' },
  Ĭ: { char: 'I', accent: '˘' },
  Ǐ: { char: 'I', accent: 'ˇ' },
  Ȉ: { char: 'I', accent: '`' },
  Ȋ: { char: 'I', accent: '¨' },
  Ī: { char: 'I', accent: '-' },
  Ó: { char: 'O', accent: '´' },
  Ò: { char: 'O', accent: '`' },
  Ô: { char: 'O', accent: '^' },
  Õ: { char: 'O', accent: '~' },
  Ö: { char: 'O', accent: '¨' },
  Ő: { char: 'O', accent: '˝' },
  Ǒ: { char: 'O', accent: 'ˇ' },
  Ȍ: { char: 'O', accent: '`' },
  Ȏ: { char: 'O', accent: '¨' },
  Ȫ: { char: 'O', accent: '˘' },
  Ȭ: { char: 'O', accent: '˝' },
  Ȯ: { char: 'O', accent: '˙' },
  Ō: { char: 'O', accent: '-' },
  Ú: { char: 'U', accent: '´' },
  Ù: { char: 'U', accent: '`' },
  Û: { char: 'U', accent: '^' },
  Ü: { char: 'U', accent: '¨' },
  Ű: { char: 'U', accent: '˝' },
  Ǔ: { char: 'U', accent: 'ˇ' },
  Ǖ: { char: 'U', accent: '¨' },
  Ȕ: { char: 'U', accent: '`' },
  Ȗ: { char: 'U', accent: '¨' },
  Ū: { char: 'U', accent: '-' },
  Ý: { char: 'Y', accent: '´' },
  Ỳ: { char: 'Y', accent: '`' },
  Ŷ: { char: 'Y', accent: '^' },
  Ÿ: { char: 'Y', accent: '¨' },
  Ȳ: { char: 'Y', accent: '-' },
  ñ: { char: 'n', accent: '~' },
  Ñ: { char: 'N', accent: '~' },
  ç: { char: 'c', accent: '˙' },
  Ç: { char: 'C', accent: '˙' },
  ṽ: { char: 'v', accent: '~' },
  Ṽ: { char: 'V', accent: '~' },
  ĵ: { char: 'j', accent: '^' },
  Ĵ: { char: 'J', accent: '^' },
  ź: { char: 'z', accent: '´' },
  Ź: { char: 'Z', accent: '´' },
  Ż: { char: 'Z', accent: '^' },
  ż: { char: 'z', accent: '^' },
  Ž: { char: 'Z', accent: 'ˇ' },
  ž: { char: 'z', accent: 'ˇ' },
  ẑ: { char: 'z', accent: 'ˆ' },
};

const accentToLTXCmd: Record<Accent, LTXAccentCMD> = {
  '´': 'acute',
  '`': 'grave',
  '^': 'hat',
  '~': 'tilde',
  '¨': 'ddot',
  '˚': 'mathring',
  '˘': 'breve',
  ˇ: 'check',
  '˝': 'H',
  '˙': 'dot',
  '-': 'bar',
  ˆ: 'hat',
  '˜': 'tilde',
};

type LTXFontCmds = 'mathbf' | 'mathit' | 'mathbb' | 'mathcal' | 'mathfrak' | 'mathsf' | 'mathtt';
type UppercaseLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | '\\Beta'
  | '\\Gamma'
  | '\\Delta'
  | '\\Theta'
  | '\\Lambda'
  | '\\Xi'
  | '\\Pi'
  | '\\Sigma'
  | '\\Upsilon'
  | '\\Phi'
  | '\\Psi'
  | '\\Omega'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';
type SpecialFontChar = {
  letter: UppercaseLetter;
  fontCmd: LTXFontCmds;
};

const specialFontChars: Record<string, SpecialFontChar> = {
  // letter A mathbf
  𝐀: { letter: 'A', fontCmd: 'mathbf' },
  𝐁: { letter: 'B', fontCmd: 'mathbf' },
  𝐂: { letter: 'C', fontCmd: 'mathbf' },
  𝐃: { letter: 'D', fontCmd: 'mathbf' },
  𝐄: { letter: 'E', fontCmd: 'mathbf' },
  Ε: { letter: 'E', fontCmd: 'mathbf' },
  𝐅: { letter: 'F', fontCmd: 'mathbf' },
  𝐆: { letter: 'G', fontCmd: 'mathbf' },
  𝐇: { letter: 'H', fontCmd: 'mathbf' },
  𝐈: { letter: 'I', fontCmd: 'mathbf' },
  𝐉: { letter: 'J', fontCmd: 'mathbf' },
  𝐊: { letter: 'K', fontCmd: 'mathbf' },
  𝐋: { letter: 'L', fontCmd: 'mathbf' },
  𝐌: { letter: 'M', fontCmd: 'mathbf' },
  𝐍: { letter: 'N', fontCmd: 'mathbf' },
  𝐎: { letter: 'O', fontCmd: 'mathbf' },
  𝐏: { letter: 'P', fontCmd: 'mathbf' },
  𝐐: { letter: 'Q', fontCmd: 'mathbf' },
  𝐑: { letter: 'R', fontCmd: 'mathbf' },
  𝐒: { letter: 'S', fontCmd: 'mathbf' },
  𝐓: { letter: 'T', fontCmd: 'mathbf' },
  𝐔: { letter: 'U', fontCmd: 'mathbf' },
  𝐕: { letter: 'V', fontCmd: 'mathbf' },
  𝐖: { letter: 'W', fontCmd: 'mathbf' },
  𝐗: { letter: 'X', fontCmd: 'mathbf' },
  𝞆: { letter: 'X', fontCmd: 'mathbf' },
  𝐘: { letter: 'Y', fontCmd: 'mathbf' },
  𝐙: { letter: 'Z', fontCmd: 'mathbf' },
  '𝟎': { letter: '0', fontCmd: 'mathbf' },
  '𝟏': { letter: '1', fontCmd: 'mathbf' },
  '𝟐': { letter: '2', fontCmd: 'mathbf' },
  '𝟑': { letter: '3', fontCmd: 'mathbf' },
  '𝟒': { letter: '4', fontCmd: 'mathbf' },
  '𝟓': { letter: '5', fontCmd: 'mathbf' },
  '𝟔': { letter: '6', fontCmd: 'mathbf' },
  '𝟕': { letter: '7', fontCmd: 'mathbf' },
  '𝟖': { letter: '8', fontCmd: 'mathbf' },
  '𝟗': { letter: '9', fontCmd: 'mathbf' },
  // letter A mathit
  𝐴: { letter: 'A', fontCmd: 'mathit' },
  𝐵: { letter: 'B', fontCmd: 'mathit' },
  𝐶: { letter: 'C', fontCmd: 'mathit' },
  𝐷: { letter: 'D', fontCmd: 'mathit' },
  𝐸: { letter: 'E', fontCmd: 'mathit' },
  𝐹: { letter: 'F', fontCmd: 'mathit' },
  𝐺: { letter: 'G', fontCmd: 'mathit' },
  𝐻: { letter: 'H', fontCmd: 'mathit' },
  𝐼: { letter: 'I', fontCmd: 'mathit' },
  Ι: { letter: 'I', fontCmd: 'mathit' },
  𝐽: { letter: 'J', fontCmd: 'mathit' },
  𝐾: { letter: 'K', fontCmd: 'mathit' },
  𝐿: { letter: 'L', fontCmd: 'mathit' },
  𝑀: { letter: 'M', fontCmd: 'mathit' },
  𝑁: { letter: 'N', fontCmd: 'mathit' },
  𝑂: { letter: 'O', fontCmd: 'mathit' },
  𝑃: { letter: 'P', fontCmd: 'mathit' },
  𝑄: { letter: 'Q', fontCmd: 'mathit' },
  𝑅: { letter: 'R', fontCmd: 'mathit' },
  𝑆: { letter: 'S', fontCmd: 'mathit' },
  𝑇: { letter: 'T', fontCmd: 'mathit' },
  𝑈: { letter: 'U', fontCmd: 'mathit' },
  𝑉: { letter: 'V', fontCmd: 'mathit' },
  𝑊: { letter: 'W', fontCmd: 'mathit' },
  𝑋: { letter: 'X', fontCmd: 'mathit' },
  𝑌: { letter: 'Y', fontCmd: 'mathit' },
  𝑍: { letter: 'Z', fontCmd: 'mathit' },
  // letter A mathbb
  𝔸: { letter: 'A', fontCmd: 'mathbb' },
  𝔹: { letter: 'B', fontCmd: 'mathbb' },
  ℂ: { letter: 'C', fontCmd: 'mathbb' },
  𝔻: { letter: 'D', fontCmd: 'mathbb' },
  𝔼: { letter: 'E', fontCmd: 'mathbb' },
  𝔽: { letter: 'F', fontCmd: 'mathbb' },
  𝔾: { letter: 'G', fontCmd: 'mathbb' },
  ℍ: { letter: 'H', fontCmd: 'mathbb' },
  𝕀: { letter: 'I', fontCmd: 'mathbb' },
  𝕁: { letter: 'J', fontCmd: 'mathbb' },
  𝕂: { letter: 'K', fontCmd: 'mathbb' },
  𝕃: { letter: 'L', fontCmd: 'mathbb' },
  𝕄: { letter: 'M', fontCmd: 'mathbb' },
  ℕ: { letter: 'N', fontCmd: 'mathbb' },
  𝕆: { letter: 'O', fontCmd: 'mathbb' },
  ℙ: { letter: 'P', fontCmd: 'mathbb' },
  ℚ: { letter: 'Q', fontCmd: 'mathbb' },
  ℝ: { letter: 'R', fontCmd: 'mathbb' },
  𝕊: { letter: 'S', fontCmd: 'mathbb' },
  𝕋: { letter: 'T', fontCmd: 'mathbb' },
  𝕌: { letter: 'U', fontCmd: 'mathbb' },
  𝕍: { letter: 'V', fontCmd: 'mathbb' },
  𝕎: { letter: 'W', fontCmd: 'mathbb' },
  𝕏: { letter: 'X', fontCmd: 'mathbb' },
  𝕐: { letter: 'Y', fontCmd: 'mathbb' },
  ℤ: { letter: 'Z', fontCmd: 'mathbb' },
  '𝟘': { letter: '0', fontCmd: 'mathbb' },
  '𝟙': { letter: '1', fontCmd: 'mathbb' },
  '𝟚': { letter: '2', fontCmd: 'mathbb' },
  '𝟛': { letter: '3', fontCmd: 'mathbb' },
  '𝟜': { letter: '4', fontCmd: 'mathbb' },
  '𝟝': { letter: '5', fontCmd: 'mathbb' },
  '𝟞': { letter: '6', fontCmd: 'mathbb' },
  '𝟟': { letter: '7', fontCmd: 'mathbb' },
  '𝟠': { letter: '8', fontCmd: 'mathbb' },
  '𝟡': { letter: '9', fontCmd: 'mathbb' },
  // letter A mathcal
  𝒜: { letter: 'A', fontCmd: 'mathcal' },
  𝓐: { letter: 'A', fontCmd: 'mathcal' },
  ℬ: { letter: 'B', fontCmd: 'mathcal' },
  𝒞: { letter: 'C', fontCmd: 'mathcal' },
  𝒟: { letter: 'D', fontCmd: 'mathcal' },
  𝓓: { letter: 'D', fontCmd: 'mathcal' },
  ℰ: { letter: 'E', fontCmd: 'mathcal' },
  ℱ: { letter: 'F', fontCmd: 'mathcal' },
  𝓕: { letter: 'F', fontCmd: 'mathcal' },
  𝒢: { letter: 'G', fontCmd: 'mathcal' },
  ℋ: { letter: 'H', fontCmd: 'mathcal' },
  ℐ: { letter: 'I', fontCmd: 'mathcal' },
  𝒥: { letter: 'J', fontCmd: 'mathcal' },
  𝒦: { letter: 'K', fontCmd: 'mathcal' },
  ℒ: { letter: 'L', fontCmd: 'mathcal' },
  𝓛: { letter: 'L', fontCmd: 'mathcal' },
  ℳ: { letter: 'M', fontCmd: 'mathcal' },
  𝒩: { letter: 'N', fontCmd: 'mathcal' },
  𝒪: { letter: 'O', fontCmd: 'mathcal' },
  𝓞: { letter: 'O', fontCmd: 'mathcal' },
  𝒫: { letter: 'P', fontCmd: 'mathcal' },
  𝒬: { letter: 'Q', fontCmd: 'mathcal' },
  ℛ: { letter: 'R', fontCmd: 'mathcal' },
  𝕽: { letter: 'R', fontCmd: 'mathcal' },
  '℟': { letter: 'R', fontCmd: 'mathcal' },
  𝒮: { letter: 'S', fontCmd: 'mathcal' },
  𝒯: { letter: 'T', fontCmd: 'mathcal' },
  𝒰: { letter: 'U', fontCmd: 'mathcal' },
  𝒱: { letter: 'V', fontCmd: 'mathcal' },
  𝒲: { letter: 'W', fontCmd: 'mathcal' },
  𝒳: { letter: 'X', fontCmd: 'mathcal' },
  𝒴: { letter: 'Y', fontCmd: 'mathcal' },
  𝒵: { letter: 'Z', fontCmd: 'mathcal' },
  // letter A mathfrak
  𝔄: { letter: 'A', fontCmd: 'mathfrak' },
  𝔅: { letter: 'B', fontCmd: 'mathfrak' },
  ℭ: { letter: 'C', fontCmd: 'mathfrak' },
  𝔇: { letter: 'D', fontCmd: 'mathfrak' },
  𝔈: { letter: 'E', fontCmd: 'mathfrak' },
  𝔉: { letter: 'F', fontCmd: 'mathfrak' },
  𝔊: { letter: 'G', fontCmd: 'mathfrak' },
  ℌ: { letter: 'H', fontCmd: 'mathfrak' },
  ℑ: { letter: 'I', fontCmd: 'mathfrak' },
  𝔍: { letter: 'J', fontCmd: 'mathfrak' },
  𝔎: { letter: 'K', fontCmd: 'mathfrak' },
  𝔏: { letter: 'L', fontCmd: 'mathfrak' },
  𝔐: { letter: 'M', fontCmd: 'mathfrak' },
  𝔑: { letter: 'N', fontCmd: 'mathfrak' },
  𝔒: { letter: 'O', fontCmd: 'mathfrak' },
  𝔓: { letter: 'P', fontCmd: 'mathfrak' },
  𝔔: { letter: 'Q', fontCmd: 'mathfrak' },
  ℜ: { letter: 'R', fontCmd: 'mathfrak' },
  𝔖: { letter: 'S', fontCmd: 'mathfrak' },
  𝔗: { letter: 'T', fontCmd: 'mathfrak' },
  𝔘: { letter: 'U', fontCmd: 'mathfrak' },
  𝔙: { letter: 'V', fontCmd: 'mathfrak' },
  𝔚: { letter: 'W', fontCmd: 'mathfrak' },
  𝔛: { letter: 'X', fontCmd: 'mathfrak' },
  𝔜: { letter: 'Y', fontCmd: 'mathfrak' },
  ℨ: { letter: 'Z', fontCmd: 'mathfrak' },
  // letter A mathsf
  𝖠: { letter: 'A', fontCmd: 'mathsf' },
  Α: { letter: 'A', fontCmd: 'mathsf' },
  𝖡: { letter: 'B', fontCmd: 'mathsf' },
  Β: { letter: 'B', fontCmd: 'mathsf' },
  𝖢: { letter: 'C', fontCmd: 'mathsf' },
  𝖣: { letter: 'D', fontCmd: 'mathsf' },
  𝖤: { letter: 'E', fontCmd: 'mathsf' },
  𝖥: { letter: 'F', fontCmd: 'mathsf' },
  𝖦: { letter: 'G', fontCmd: 'mathsf' },
  𝖧: { letter: 'H', fontCmd: 'mathsf' },
  𝖨: { letter: 'I', fontCmd: 'mathsf' },
  𝖩: { letter: 'J', fontCmd: 'mathsf' },
  ȷ: { letter: 'J', fontCmd: 'mathsf' },
  𝖪: { letter: 'K', fontCmd: 'mathsf' },
  Κ: { letter: 'K', fontCmd: 'mathsf' },
  𝖫: { letter: 'L', fontCmd: 'mathsf' },
  𝖬: { letter: 'M', fontCmd: 'mathsf' },
  𝖭: { letter: 'N', fontCmd: 'mathsf' },
  𝖮: { letter: 'O', fontCmd: 'mathsf' },
  𝖯: { letter: 'P', fontCmd: 'mathsf' },
  𝖰: { letter: 'Q', fontCmd: 'mathsf' },
  𝖱: { letter: 'R', fontCmd: 'mathsf' },
  𝖲: { letter: 'S', fontCmd: 'mathsf' },
  𝖳: { letter: 'T', fontCmd: 'mathsf' },
  𝖴: { letter: 'U', fontCmd: 'mathsf' },
  𝖵: { letter: 'V', fontCmd: 'mathsf' },
  𝖶: { letter: 'W', fontCmd: 'mathsf' },
  𝖷: { letter: 'X', fontCmd: 'mathsf' },
  Χ: { letter: 'X', fontCmd: 'mathsf' },
  𝖸: { letter: 'Y', fontCmd: 'mathsf' },
  𝖹: { letter: 'Z', fontCmd: 'mathsf' },
  // letter A mathtt
  𝚨: { letter: 'A', fontCmd: 'mathtt' },
  𝚩: { letter: 'B', fontCmd: 'mathtt' },
  𝚪: { letter: '\\Gamma', fontCmd: 'mathtt' },
  𝚫: { letter: '\\Delta', fontCmd: 'mathtt' },
  𝚬: { letter: 'E', fontCmd: 'mathtt' },
  𝚭: { letter: 'F', fontCmd: 'mathtt' },
  𝚮: { letter: 'G', fontCmd: 'mathtt' },
  𝚯: { letter: '\\Theta', fontCmd: 'mathtt' },
  𝚰: { letter: 'I', fontCmd: 'mathtt' },
  𝚱: { letter: 'J', fontCmd: 'mathtt' },
  𝚲: { letter: '\\Lambda', fontCmd: 'mathtt' },
  𝚳: { letter: 'L', fontCmd: 'mathtt' },
  𝚴: { letter: 'M', fontCmd: 'mathtt' },
  𝚵: { letter: '\\Pi', fontCmd: 'mathtt' },
  𝚶: { letter: 'O', fontCmd: 'mathtt' },
  𝚷: { letter: '\\Pi', fontCmd: 'mathtt' },
  𝚸: { letter: 'Q', fontCmd: 'mathtt' },
  𝚹: { letter: 'R', fontCmd: 'mathtt' },
  𝚺: { letter: 'S', fontCmd: 'mathtt' },
  𝚻: { letter: 'T', fontCmd: 'mathtt' },
  𝚼: { letter: 'U', fontCmd: 'mathtt' },
  𝚽: { letter: '\\Phi', fontCmd: 'mathtt' },
  𝚾: { letter: 'W', fontCmd: 'mathtt' },
  𝚿: { letter: '\\Psi', fontCmd: 'mathtt' },
  𝛀: { letter: '\\Omega', fontCmd: 'mathtt' },
};
