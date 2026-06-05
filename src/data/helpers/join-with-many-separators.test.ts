import { JoinWithManySeparators } from './join-with-many-separators';

describe('JoinWithManySeparators.join', () => {
  it('uses one separator per gap, in order', () => {
    expect(JoinWithManySeparators.join(['3', '2', '1', '7'], [';', '.'], '')).toBe('3;2.1.7');
  });

  it('reuses the last separator once they run out', () => {
    expect(JoinWithManySeparators.join(['a', 'b', 'c'], [';'], '')).toBe('a;b;c');
  });

  it('falls back to the default separator when none are given', () => {
    expect(JoinWithManySeparators.join(['a', 'b', 'c'], [], ',')).toBe('a,b,c');
  });

  it('adds no trailing separator', () => {
    expect(JoinWithManySeparators.join(['a'], [';'], ',')).toBe('a');
  });
});
