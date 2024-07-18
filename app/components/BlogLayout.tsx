import React from "react";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary text-primary-content flex flex-col items-center py-10">
      <div className="w-full max-w-4xl px-4">{children}</div>
    </div>
  );
};

export default BlogLayout;
