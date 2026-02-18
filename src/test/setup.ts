// src/test/setup.ts
import '@testing-library/jest-dom';

// Minimal but robust matchMedia polyfill for jsdom tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];
    const mql: any = {
      matches: false,
      media: query,
      onchange: null,
      addListener: (cb: () => void) => {
        // legacy API no-op
      },
      removeListener: (cb: () => void) => {
        // legacy API no-op
      },
      addEventListener: (evt: string, cb: (e: any) => void) => {
        listeners.push(cb);
      },
      removeEventListener: (evt: string, cb: (e: any) => void) => {
        const idx = listeners.indexOf(cb);
        if (idx !== -1) listeners.splice(idx, 1);
      },
      dispatchEvent: (event: Event) => false,
      // Test helper: call mql._setMatches(true|false) in tests to simulate preference changes
      _setMatches: (value: boolean) => {
        mql.matches = value;
        const ev = { matches: value, media: query } as MediaQueryListEvent;
        listeners.forEach((l) => l(ev));
        if (typeof mql.onchange === 'function') mql.onchange(ev);
      },
    };
    return mql;
  },
});
