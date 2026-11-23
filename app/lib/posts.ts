import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";

export const DEFAULT_POSTS_DIR = path.join(process.cwd(), "content/blog");

const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;

/**
 * Frontmatter is external input: it is parsed from disk and typed as `any` by
 * gray-matter. Validate it once here so a typo fails the build instead of
 * silently rendering "Invalid Date" or an empty heading.
 */
const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date must be an ISO calendar date (YYYY-MM-DD)",
  }),
  description: z.string().min(1),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export interface PostSummary extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostSummary {
  content: string;
}

export class PostNotFoundError extends Error {
  constructor(slug: string) {
    super(`No post found for slug "${slug}"`);
    this.name = "PostNotFoundError";
  }
}

export class InvalidPostError extends Error {
  constructor(fileName: string, details: string) {
    super(`Invalid frontmatter in content/blog/${fileName}: ${details}`);
    this.name = "InvalidPostError";
  }
}

function getPostFiles(directory: string): string[] {
  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort();
}

function readPost(slug: string, directory: string): Post {
  const fullPath = path.join(directory, `${slug}.md`);

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new PostNotFoundError(slug);
    }
    throw error;
  }

  const { data, content } = matter(fileContents);
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new InvalidPostError(`${slug}.md`, parsed.error.message);
  }

  return { slug, ...parsed.data, content };
}

/**
 * Cache keyed by directory + file mtimes, so edits during `next dev` are picked
 * up without re-reading every post for each route that asks for the list.
 */
let summaryCache: { key: string; summaries: PostSummary[] } | undefined;

function cacheKey(directory: string, fileNames: string[]): string {
  const stamps = fileNames
    .map((fileName) => {
      const stat = fs.statSync(path.join(directory, fileName));
      return `${fileName}:${stat.mtimeMs}`;
    })
    .join("|");
  return `${directory}|${stamps}`;
}

export function getSortedPostsData(
  directory: string = DEFAULT_POSTS_DIR,
): PostSummary[] {
  const fileNames = getPostFiles(directory);
  const key = cacheKey(directory, fileNames);

  if (summaryCache?.key === key) return summaryCache.summaries;

  const summaries = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const {
      slug: postSlug,
      title,
      date,
      description,
    } = readPost(slug, directory);
    return { slug: postSlug, title, date, description };
  });

  summaries.sort(
    (a, b) =>
      new Date(`${b.date}T12:00:00`).getTime() -
      new Date(`${a.date}T12:00:00`).getTime(),
  );

  summaryCache = { key, summaries };
  return summaries;
}

export function getPostData(
  slug: string,
  directory: string = DEFAULT_POSTS_DIR,
): Post {
  // Reject traversal attempts before touching the filesystem.
  if (!SLUG_PATTERN.test(slug)) throw new PostNotFoundError(slug);
  return readPost(slug, directory);
}

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "a",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "em",
    "strong",
    "del",
    "hr",
    "br",
    "img",
    "figure",
    "figcaption",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "input",
    "sup",
    "sub",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    code: ["class"],
    pre: ["class"],
    input: ["type", "checked", "disabled"],
    th: ["align"],
    td: ["align"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

/** Render Markdown to sanitized HTML for `dangerouslySetInnerHTML`. */
export function renderPostContent(markdown: string): string {
  const html = marked.parse(markdown, { async: false });
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}
