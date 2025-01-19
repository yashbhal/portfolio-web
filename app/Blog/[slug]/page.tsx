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
      <article className="card glass bg-base-300 shadow-xl animate-fade-in mt-20">
        {/* Post Header */}
        <div className="p-8 md:p-12 border-b border-base-content/10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            {post.title}
          </h1>
          <time className="text-sm font-sans text-base-content/60">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {/* Post Content */}
        <div className="p-8 md:p-12">
          <div
            className="prose prose-lg max-w-none space-y-6
                     prose-headings:font-heading prose-headings:mt-8 prose-headings:mb-4
                     prose-p:mb-6 prose-img:my-8
                     prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-lg prose-pre:bg-base-200"
            dangerouslySetInnerHTML={{ __html: marked(post.content) }}
          />
        </div>
      </article>
    </BlogLayout>
  );
};

export default BlogPostPage;
