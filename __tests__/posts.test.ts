import { describe, expect, it } from "vitest";
import { getPostData, getSortedPostsData } from "../app/Blog/posts";

describe("getPostData", () => {
  it("loads a real post", () => {
    const post = getPostData("post1");

    expect(post.title).toBe("Favorite Books - 2024");
    expect(post.date).toBe("2025-01-31");
    expect(post.content).toContain("Why We Sleep");
  });

  it.each(["../secrets", "..%2Fsecrets", "post1/extra", "post1.md/../../x"])(
    "rejects traversal slug %s",
    (slug) => {
      expect(() => getPostData(slug)).toThrowError(/NEXT_HTTP_ERROR_FALLBACK/);
    }
  );

  it("rejects a slug with no matching file", () => {
    expect(() => getPostData("does-not-exist")).toThrowError(
      /NEXT_HTTP_ERROR_FALLBACK/
    );
  });
});

describe("getSortedPostsData", () => {
  it("returns only markdown-derived posts with valid metadata", () => {
    const posts = getSortedPostsData();

    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.slug).toMatch(/^[a-zA-Z0-9_-]+$/);
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
    }
  });
});
