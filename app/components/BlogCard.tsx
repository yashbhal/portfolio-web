import React from "react";
import Link from "next/link";

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
    <div className="card glass shadow-lg bg-base-300 transition-standard">
      <div className="card-body p-6">
        {/* Title with hover effect */}
        <h2
          className="card-title font-heading text-2xl hover:text-primary 
                     transition-colors duration-300"
        >
          {title}
        </h2>

        {/* Date with modern styling */}
        <time className="text-sm font-sans text-base-content/60 mb-3">
          {date}
        </time>

        {/* Description with improved readability */}
        <p className="font-sans text-base-content/80 leading-relaxed">
          {description}
        </p>

        {/* Action button with animation */}
        <div className="card-actions justify-end mt-4">
          <Link
            href={`/Blog/${slug}`}
            className="btn btn-primary btn-outline gap-2 group"
          >
            Read More
            <svg
              className="w-4 h-4 transform transition-transform duration-300
                       group-hover:translate-x-1"
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
