import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/** Create a throwaway posts directory for a single test. */
export function makePostsDir(files: Record<string, string>): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-posts-"));

  for (const [fileName, contents] of Object.entries(files)) {
    fs.writeFileSync(path.join(directory, fileName), contents);
  }

  return directory;
}

export function postMarkdown({
  title = "Hello",
  date = "2025-01-31",
  description = "A description",
  body = "Body text",
}: {
  title?: string;
  date?: string;
  description?: string;
  body?: string;
} = {}): string {
  return [
    "---",
    `title: "${title}"`,
    `date: "${date}"`,
    `description: "${description}"`,
    "---",
    "",
    body,
    "",
  ].join("\n");
}
