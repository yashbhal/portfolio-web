import React from "react";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container-responsive py-8 md:py-12 lg:py-16">
        <div className="space-y-6 md:space-y-8">{children}</div>
      </div>
    </div>
  );
};

export default BlogLayout;
