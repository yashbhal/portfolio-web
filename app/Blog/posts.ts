import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "app/BlogPosts");

interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export function getSortedPostsData(): Omit<PostData, "content">[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
    };
  });

  return allPostsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostData(slug: string): PostData {
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    notFound();
  }
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch {
    notFound();
  }
  const matterResult = matter(fileContents);

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    content: matterResult.content,
  };
}
