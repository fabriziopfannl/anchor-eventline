import { describe, it, expect } from "vitest";
import { decodeEventLogs } from "./decode";

describe("decodeEventLogs", () => {
  it("returns empty when no logs match", () => {
    const events = decodeEventLogs(["foo"], {
      SwapEvent: { version: 1, decoder: () => ({}) },
    });
    expect(events.length).toBe(0);
  });
});
