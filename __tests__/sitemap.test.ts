import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import { siteConfig } from "../app/lib/site";

describe("sitemap", () => {
  it("includes every public route", () => {
    const urls = sitemap().map((entry) => entry.url);
    const base = siteConfig.url;

    expect(urls).toContain(base);
    expect(urls).toContain(`${base}/work`);
    expect(urls).toContain(`${base}/blog`);
    expect(urls).toContain(`${base}/blog/post1`);
  });

  it("uses valid lastModified values", () => {
    for (const entry of sitemap()) {
      expect(Number.isNaN(new Date(entry.lastModified ?? 0).getTime())).toBe(
        false,
      );
    }
  });
});
