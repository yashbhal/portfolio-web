import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostData,
  getSortedPostsData,
  PostNotFoundError,
  renderPostContent,
} from "../../lib/posts";
import { formatPostDate } from "../../lib/date";
import BlogLayout from "../../components/BlogLayout";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => {
  return getSortedPostsData().map((post) => ({ slug: post.slug }));
};

// The loader distinguishes a missing file from real I/O errors; only the
// former is a 404. Everything else propagates to the error boundary.
const getPostOrNotFound = (slug: string) => {
  try {
    return getPostData(slug);
  } catch (error) {
    if (error instanceof PostNotFoundError) notFound();
    throw error;
  }
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostOrNotFound(slug);
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getPostOrNotFound(slug);

  return (
    <BlogLayout>
      <article className="card border-base-content/10 bg-base-200/60 animate-fade-in mt-20 border shadow-md hover:shadow-lg">
        {/* Post Header */}
        <div className="border-base-content/10 border-b p-8 md:p-12">
          <h1 className="font-heading mb-6 text-3xl font-bold md:text-4xl">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="text-base-content/60 font-sans text-sm"
          >
            {formatPostDate(post.date)}
          </time>
        </div>

        {/* Post Content */}
        <div className="p-8 md:p-12">
          <div
            className="prose prose-lg prose-headings:font-heading prose-headings:mt-8 prose-headings:mb-4 prose-p:mb-6 prose-img:my-8 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-base-200 max-w-none space-y-6"
            dangerouslySetInnerHTML={{
              __html: renderPostContent(post.content),
            }}
          />
        </div>
      </article>
    </BlogLayout>
  );
};

export default BlogPostPage;
