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
    <div className="card glass my-4 shadow-lg bg-base-300">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="my-2">{description}</p>
        <div className="card-actions justify-end">
          <Link href={`/Blog/${slug}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
