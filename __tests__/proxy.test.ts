// @vitest-environment node
import { describe, expect, it } from "vitest";
import type { NextRequest } from "next/server";
import { proxy } from "../proxy";

const request = (path: string) =>
  ({
    nextUrl: new URL(path, "https://example.com"),
    url: `https://example.com${path}`,
  }) as NextRequest;

describe("proxy legacy route redirects", () => {
  it.each([
    ["/Blog", "/blog"],
    ["/Blog/post1", "/blog/post1"],
    ["/Work", "/work"],
  ])("redirects %s to %s", (from, to) => {
    const response = proxy(request(from));
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(`https://example.com${to}`);
  });

  it.each(["/blog", "/blog/post1", "/work", "/"])(
    "leaves lowercase route %s alone",
    (path) => {
      const response = proxy(request(path));
      expect(response.headers.get("location")).toBeNull();
    },
  );
});
