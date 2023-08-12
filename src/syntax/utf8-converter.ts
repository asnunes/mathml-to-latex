import { UTF8ToLtXConverter } from 'data/protocols';

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
    const { vowel, accent } = char;
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
  vowel: Vowel;
  accent: Accent;
};

type Vowel = 'a' | 'e' | 'i' | 'o' | 'u' | 'y' | 'A' | 'E' | 'I' | 'O' | 'U' | 'Y';
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
  | 'vec';

const vowelsWithAccents: Record<string, AccentChar> = {
  á: { vowel: 'a', accent: '´' },
  à: { vowel: 'a', accent: '`' },
  â: { vowel: 'a', accent: '^' },
  ã: { vowel: 'a', accent: '~' },
  ä: { vowel: 'a', accent: '¨' },
  å: { vowel: 'a', accent: '˚' },
  ą: { vowel: 'a', accent: '˙' },
  ă: { vowel: 'a', accent: '˘' },
  ǎ: { vowel: 'a', accent: 'ˇ' },
  ǟ: { vowel: 'a', accent: 'ˆ' },
  ǻ: { vowel: 'a', accent: '˙' },
  ǡ: { vowel: 'a', accent: '-' },
  ā: { vowel: 'a', accent: '-' },
  é: { vowel: 'e', accent: '´' },
  è: { vowel: 'e', accent: '`' },
  ê: { vowel: 'e', accent: '^' },
  ë: { vowel: 'e', accent: '¨' },
  ę: { vowel: 'e', accent: '˙' },
  ě: { vowel: 'e', accent: 'ˇ' },
  ȇ: { vowel: 'i', accent: '^' },
  ё: { vowel: 'e', accent: '¨' },
  ē: { vowel: 'e', accent: '-' },
  í: { vowel: 'i', accent: '´' },
  ì: { vowel: 'i', accent: '`' },
  î: { vowel: 'i', accent: '^' },
  ï: { vowel: 'i', accent: '¨' },
  į: { vowel: 'i', accent: '˙' },
  ǐ: { vowel: 'i', accent: 'ˇ' },
  ȉ: { vowel: 'i', accent: '`' },
  ȋ: { vowel: 'i', accent: '¨' },
  ī: { vowel: 'i', accent: '-' },
  ó: { vowel: 'o', accent: '´' },
  ò: { vowel: 'o', accent: '`' },
  ô: { vowel: 'o', accent: '^' },
  õ: { vowel: 'o', accent: '~' },
  ö: { vowel: 'o', accent: '¨' },
  ő: { vowel: 'o', accent: '˝' },
  ǒ: { vowel: 'o', accent: 'ˇ' },
  ȍ: { vowel: 'o', accent: '`' },
  ȏ: { vowel: 'o', accent: '¨' },
  ȫ: { vowel: 'o', accent: '˘' },
  ȭ: { vowel: 'o', accent: '˝' },
  ȯ: { vowel: 'o', accent: '˙' },
  ō: { vowel: 'o', accent: '-' },
  ú: { vowel: 'u', accent: '´' },
  ù: { vowel: 'u', accent: '`' },
  û: { vowel: 'u', accent: '^' },
  ü: { vowel: 'u', accent: '¨' },
  ű: { vowel: 'u', accent: '˝' },
  ǔ: { vowel: 'u', accent: 'ˇ' },
  ǖ: { vowel: 'u', accent: '¨' },
  ǘ: { vowel: 'u', accent: '¨' },
  ǚ: { vowel: 'u', accent: '¨' },
  ǜ: { vowel: 'u', accent: '¨' },
  ȕ: { vowel: 'u', accent: '`' },
  ȗ: { vowel: 'u', accent: '¨' },
  ū: { vowel: 'u', accent: '-' },
  ý: { vowel: 'y', accent: '´' },
  ỳ: { vowel: 'y', accent: '`' },
  ŷ: { vowel: 'y', accent: '^' },
  ÿ: { vowel: 'y', accent: '¨' },
  ȳ: { vowel: 'y', accent: '-' },
  Á: { vowel: 'A', accent: '´' },
  À: { vowel: 'A', accent: '`' },
  Â: { vowel: 'A', accent: '^' },
  Ã: { vowel: 'A', accent: '~' },
  Ä: { vowel: 'A', accent: '¨' },
  Å: { vowel: 'A', accent: '˚' },
  Å: { vowel: 'A', accent: '˚' },
  Ă: { vowel: 'A', accent: '˘' },
  Ǎ: { vowel: 'A', accent: 'ˇ' },
  Ǟ: { vowel: 'A', accent: '˝' },
  Ǻ: { vowel: 'A', accent: '˚' },
  Ǡ: { vowel: 'A', accent: '-' },
  Ā: { vowel: 'A', accent: '-' },
  É: { vowel: 'E', accent: '´' },
  È: { vowel: 'E', accent: '`' },
  Ė: { vowel: 'E', accent: '˙' },
  Ê: { vowel: 'E', accent: '^' },
  Ë: { vowel: 'E', accent: '¨' },
  Ě: { vowel: 'E', accent: 'ˇ' },
  Ȅ: { vowel: 'E', accent: '`' },
  Ȇ: { vowel: 'E', accent: '¨' },
  Ē: { vowel: 'E', accent: '-' },
  Í: { vowel: 'I', accent: '´' },
  Ì: { vowel: 'I', accent: '`' },
  Î: { vowel: 'I', accent: '^' },
  Ï: { vowel: 'I', accent: '¨' },
  Ĭ: { vowel: 'I', accent: '˘' },
  Ǐ: { vowel: 'I', accent: 'ˇ' },
  Ȉ: { vowel: 'I', accent: '`' },
  Ȋ: { vowel: 'I', accent: '¨' },
  Ī: { vowel: 'I', accent: '-' },
  Ó: { vowel: 'O', accent: '´' },
  Ò: { vowel: 'O', accent: '`' },
  Ô: { vowel: 'O', accent: '^' },
  Õ: { vowel: 'O', accent: '~' },
  Ö: { vowel: 'O', accent: '¨' },
  Ő: { vowel: 'O', accent: '˝' },
  Ǒ: { vowel: 'O', accent: 'ˇ' },
  Ȍ: { vowel: 'O', accent: '`' },
  Ȏ: { vowel: 'O', accent: '¨' },
  Ȫ: { vowel: 'O', accent: '˘' },
  Ȭ: { vowel: 'O', accent: '˝' },
  Ȯ: { vowel: 'O', accent: '˙' },
  Ō: { vowel: 'O', accent: '-' },
  Ú: { vowel: 'U', accent: '´' },
  Ù: { vowel: 'U', accent: '`' },
  Û: { vowel: 'U', accent: '^' },
  Ü: { vowel: 'U', accent: '¨' },
  Ű: { vowel: 'U', accent: '˝' },
  Ǔ: { vowel: 'U', accent: 'ˇ' },
  Ǖ: { vowel: 'U', accent: '¨' },
  Ȕ: { vowel: 'U', accent: '`' },
  Ȗ: { vowel: 'U', accent: '¨' },
  Ū: { vowel: 'U', accent: '-' },
  Ý: { vowel: 'Y', accent: '´' },
  Ỳ: { vowel: 'Y', accent: '`' },
  Ŷ: { vowel: 'Y', accent: '^' },
  Ÿ: { vowel: 'Y', accent: '¨' },
  Ȳ: { vowel: 'Y', accent: '-' },
};

const accentToLTXCmd: Record<Accent, LTXAccentCMD> = {
  '´': 'grave',
  '`': 'acute',
  '^': 'hat',
  '~': 'tilde',
  '¨': 'ddot',
  '˚': 'mathring',
  '˘': 'breve',
  ˇ: 'check',
  '˝': 'ddot',
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
  | '\\Omega';
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
  𝖪: { letter: 'K', fontCmd: 'mathsf' },
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
