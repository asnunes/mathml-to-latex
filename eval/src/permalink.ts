export type PlaygroundMode = 'convert' | 'free';

export interface PlaygroundState {
  mode: PlaygroundMode;
  input: string;
}

/**
 * Persists the playground state in the URL hash, so any input can be shared
 * as a permalink (e.g. a reproduction attached to an issue or PR).
 */
export class Permalink {
  /** @returns the state encoded in the current URL hash, or null when absent/corrupt. */
  read(): PlaygroundState | null {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return null;

    try {
      const decoded = JSON.parse(decodeURIComponent(escape(atob(hash))));
      if ((decoded.mode === 'convert' || decoded.mode === 'free') && typeof decoded.input === 'string') {
        return decoded as PlaygroundState;
      }
      return null;
    } catch {
      return null;
    }
  }

  /** Replaces the URL hash with the given state, without touching history. */
  write(state: PlaygroundState): void {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    window.history.replaceState(null, '', `#${encoded}`);
  }
}
