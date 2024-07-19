import { getPostData } from "../posts";
import BlogLayout from "../../components/BlogLayout";
import { marked } from "marked";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: BlogPostProps) => {
  const post = getPostData(params.slug);

  return (
    <BlogLayout>
      <article className="prose lg:prose-xl">
        <h1>{post.title}</h1>
        <p className="text-sm text-gray-500">{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
      </article>
    </BlogLayout>
  );
};

export default BlogPostPage;
