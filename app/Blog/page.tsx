import BlogLayout from "../components/BlogLayout";
import BlogCard from "../components/BlogCard";
import { getSortedPostsData } from "./posts";

const BlogPage = async () => {
  const allPostsData = getSortedPostsData();

  return (
    <BlogLayout>
      <h1 className="text-4xl font-bold text-center mb-10">Blog</h1>
      {allPostsData.map(({ slug, title, date, description }) => (
        <BlogCard
          key={slug}
          title={title}
          date={date}
          description={description}
          slug={slug}
        />
      ))}
    </BlogLayout>
  );
};

export default BlogPage;
