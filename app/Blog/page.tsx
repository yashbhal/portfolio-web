import BlogLayout from "../components/BlogLayout";
import BlogCard from "../components/BlogCard";
import { getSortedPostsData } from "./posts";

const BlogPage = async () => {
  const allPostsData = getSortedPostsData();

  return (
    <BlogLayout>
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Blog
        </h1>
        <div className="w-24 h-1 mx-auto rounded-full bg-primary/20" />
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 animate-fade-in">
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
