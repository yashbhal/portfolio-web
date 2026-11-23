import React from "react";
import Link from "next/link";
import { formatPostDate } from "../lib/date";

interface BlogCardProps {
  title: string;
  date: string;
  description: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  date,
  description,
  slug,
}) => {
  return (
    <div className="card border-base-content/10 bg-base-200/60 transition-standard hover:border-base-content/20 border shadow-md hover:shadow-lg">
      <div className="card-body p-6">
        {/* Title with hover effect */}
        <h2 className="card-title font-heading hover:text-primary text-2xl transition-colors duration-300">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>

        {/* Date with modern styling */}
        <time
          dateTime={date}
          className="text-base-content/60 mb-3 font-sans text-sm"
        >
          {formatPostDate(date)}
        </time>

        {/* Description with improved readability */}
        <p className="text-base-content/80 font-sans leading-relaxed">
          {description}
        </p>

        {/* Action button with animation */}
        <div className="card-actions mt-4 justify-end">
          <Link
            href={`/blog/${slug}`}
            className="btn btn-primary btn-outline group gap-2"
          >
            Read More
            <svg
              className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
