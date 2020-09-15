import { MathMLTag } from './MathMLTag';

export class MPhantom extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mphantom', value, attributes, children);
  }

  convert(): string {
    return '';
  }
}
