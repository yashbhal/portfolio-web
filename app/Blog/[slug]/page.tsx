import type { Metadata } from "next";
import { getPostData, getSortedPostsData } from "../posts";
import BlogLayout from "../../components/BlogLayout";
import { marked } from "marked";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => {
  return getSortedPostsData().map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostData(slug);
  return { title: post.title, description: post.description };
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getPostData(slug);

  return (
    <BlogLayout>
      <article className="card border border-base-content/10 bg-base-200/60 shadow-md animate-fade-in mt-20 hover:shadow-lg">
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
