import "@testing-library/jest-dom/vitest";

// jsdom does not implement matchMedia; components use it for reduced motion.
// Setup also runs for the few Node-environment tests (e.g. proxy).
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
