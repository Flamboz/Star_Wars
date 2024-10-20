import { beforeAll } from "vitest";
import "@testing-library/jest-dom";

beforeAll(() => {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
