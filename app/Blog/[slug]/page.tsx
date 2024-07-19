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
      <div className="card glass bg-base-300 text-base-content shadow-lg p-6">
        <article className="prose lg:prose-xl">
          <h1 className="card-title">{post.title}</h1>
          <p className="text-sm text-gray-500">{post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
        </article>
      </div>
    </BlogLayout>
  );
};

export default BlogPostPage;
