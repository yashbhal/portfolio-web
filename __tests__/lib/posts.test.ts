import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getPostData,
  getSortedPostsData,
  InvalidPostError,
  PostNotFoundError,
  renderPostContent,
} from "../../app/lib/posts";
import { makePostsDir, postMarkdown } from "../support/posts";

describe("getPostData", () => {
  it("parses a valid post", () => {
    const directory = makePostsDir({
      "hello.md": postMarkdown({ title: "Hello", body: "Why We Sleep" }),
    });

    const post = getPostData("hello", directory);

    expect(post).toMatchObject({
      slug: "hello",
      title: "Hello",
      date: "2025-01-31",
      description: "A description",
    });
    expect(post.content).toContain("Why We Sleep");
  });

  it.each(["../secrets", "..%2Fsecrets", "hello/extra", "hello.md/../../x"])(
    "rejects traversal slug %s",
    (slug) => {
      expect(() => getPostData(slug)).toThrowError(PostNotFoundError);
    },
  );

  it("throws PostNotFoundError for a missing post", () => {
    const directory = makePostsDir({
      "hello.md": postMarkdown(),
    });

    expect(() => getPostData("missing", directory)).toThrowError(
      PostNotFoundError,
    );
  });

  it("throws InvalidPostError with the file name for bad frontmatter", () => {
    const directory = makePostsDir({
      "broken.md": postMarkdown({ date: "31/01/2025" }),
    });

    expect(() => getPostData("broken", directory)).toThrowError(
      InvalidPostError,
    );
    expect(() => getPostData("broken", directory)).toThrowError(/broken\.md/);
  });
});

describe("getSortedPostsData", () => {
  it("returns summaries sorted newest first and ignores non-markdown files", () => {
    const directory = makePostsDir({
      "older.md": postMarkdown({ title: "Older", date: "2024-01-01" }),
      "newer.md": postMarkdown({ title: "Newer", date: "2025-06-01" }),
      "notes.txt": "not a post",
    });

    const posts = getSortedPostsData(directory);

    expect(posts.map((post) => post.slug)).toEqual(["newer", "older"]);
    expect(posts[0]).not.toHaveProperty("content");
  });

  it("picks up edits once the file mtime changes", () => {
    const directory = makePostsDir({
      "hello.md": postMarkdown({ title: "Before" }),
    });

    expect(getSortedPostsData(directory)[0].title).toBe("Before");

    const filePath = path.join(directory, "hello.md");
    fs.writeFileSync(filePath, postMarkdown({ title: "After" }));
    const future = new Date(Date.now() + 10_000);
    fs.utimesSync(filePath, future, future);

    expect(getSortedPostsData(directory)[0].title).toBe("After");
  });
});

describe("renderPostContent", () => {
  it("renders markdown and keeps headings, code, and links", () => {
    const html = renderPostContent(
      [
        "## Heading",
        "",
        "[Link](https://example.com)",
        "",
        "```js",
        "const x = 1;",
        "```",
      ].join("\n"),
    );

    expect(html).toContain("<h2");
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("language-js");
  });

  it("strips scripts and inline event handlers", () => {
    const html = renderPostContent(
      ["<script>alert(1)</script>", '<img src="x" onerror="alert(1)">'].join(
        "\n\n",
      ),
    );

    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).toContain("<img");
  });
});
