import React from "react";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container-responsive py-8 md:py-12 lg:py-16">
        <div className="max-w-prose mx-auto">
          <div className="space-y-6 md:space-y-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
