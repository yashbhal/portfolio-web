import type { Metadata } from "next";
import BlogLayout from "../components/BlogLayout";
import BlogCard from "../components/BlogCard";
import { getSortedPostsData } from "../lib/posts";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Yash Bhalchandra.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: "Writing by Yash Bhalchandra.",
    url: "/blog",
    type: "website",
  },
};

const BlogPage = async () => {
  const allPostsData = getSortedPostsData();

  return (
    <BlogLayout>
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="font-heading mb-4 text-4xl font-bold md:text-5xl">
          Blog
        </h1>
        <div className="bg-primary/20 mx-auto h-1 w-24 rounded-full" />
      </div>

      {/* Blog Posts Grid */}
      <div className="animate-fade-in grid gap-8">
        {allPostsData.map(({ slug, title, date, description }) => (
          <div
            key={slug}
            className="transform transition-all duration-300 hover:-translate-y-1"
          >
            <BlogCard
              title={title}
              date={date}
              description={description}
              slug={slug}
            />
          </div>
        ))}
      </div>
    </BlogLayout>
  );
};

export default BlogPage;
