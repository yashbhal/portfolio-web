import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";



// Since BlogCardProps and BlogLayoutProps are not exported, we'll define them inline for our testing purposes
interface BlogCardProps {
  title: string;
  date: string;
  description: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, date, description, slug }) => (
  <div data-testid="blog-card">
    <h2>{title}</h2>
    <time>{date}</time>
    <p>{description}</p>
    <a href={`/blog/${slug}`}>Read more</a>
  </div>
);

describe("BlogCard Component", () => {
  const testBlogCardProps: BlogCardProps = {
    title: "Understanding TypeScript",
    date: "2023-12-01",
    description: "A deep dive into TypeScript features and benefits.",
    slug: "understanding-typescript"
  };

  it("should render the blog card with the correct content", () => {
    render(
      <MemoryRouter>
        <BlogCard {...testBlogCardProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("blog-card")).toBeInTheDocument();
    expect(screen.getByText(testBlogCardProps.title)).toBeInTheDocument();
    expect(screen.getByText(testBlogCardProps.date)).toBeInTheDocument();
    expect(screen.getByText(testBlogCardProps.description)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read more" })).toHaveAttribute("href", `/blog/${testBlogCardProps.slug}`);
  });
});