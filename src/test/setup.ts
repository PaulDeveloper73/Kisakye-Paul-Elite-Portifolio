// src/test/setup.ts
import '@testing-library/jest-dom';

// matchMedia polyfill for jsdom tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];
    const mql: any = {
      matches: false,
      media: query,
      onchange: null,
      addListener: (_cb: () => void) => {
        // legacy no-op
      },
      removeListener: (_cb: () => void) => {
        // legacy no-op
      },
      addEventListener: (_evt: string, cb: (e: any) => void) => {
        listeners.push(cb);
      },
      removeEventListener: (_evt: string, cb: (e: any) => void) => {
        const idx = listeners.indexOf(cb);
        if (idx !== -1) listeners.splice(idx, 1);
      },
      dispatchEvent: (_event: Event) => false,
      // helper to toggle matches in tests
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

// IntersectionObserver polyfill for jsdom tests
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }
  observe(_target: Element) {
    // no-op by default; tests can call trigger if needed
  }
  unobserve(_target: Element) {
    // no-op
  }
  disconnect() {
    // no-op
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  // helper to simulate an intersection change in tests
  static trigger(entries: IntersectionObserverEntry[], instance?: MockIntersectionObserver) {
    const cb = instance?.callback;
    if (cb) cb(entries, instance as unknown as IntersectionObserver);
  }
}

// Attach to global/window
// @ts-ignore
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
(global as any).IntersectionObserver = MockIntersectionObserver;

// Optional: provide a small helper to simulate intersection in tests
// Usage in tests:
// const entries = [{ isIntersecting: true, target: element, intersectionRatio: 1, time: Date.now(), boundingClientRect: element.getBoundingClientRect(), intersectionRect: element.getBoundingClientRect(), rootBounds: null }] as IntersectionObserverEntry[];
// (window.IntersectionObserver as any).trigger(entries, observerInstance);
