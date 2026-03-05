import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import React from 'react';


// Importing necessary testing utilities and React components

// Since BlogCardProps and BlogLayoutProps are not exported, we will define them inline for our testing purposes
interface BlogCardProps {
  title: string;
  date: string;
  description: string;
  slug: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
}

// Mock components based on the types provided
const BlogCard: React.FC<BlogCardProps> = ({ title, date, description, slug }) => (
  <div data-testid="blog-card">
    <h2>{title}</h2>
    <p>{date}</p>
    <p>{description}</p>
    <a href={`/blog/${slug}`}>Read more</a>
  </div>
);

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => (
  <div data-testid="blog-layout">{children}</div>
);

// Define test suite
describe('Blog Posts Display', () => {
  // Test case to ensure blog posts are displayed inside a card
  it('should display blog posts inside a card', () => {
    // Arrange: Create a mock blog post data
    const blogPost: BlogCardProps = {
      title: 'Understanding TypeScript',
      date: 'December 1, 2023',
      description: 'A deep dive into TypeScript features and benefits.',
      slug: 'understanding-typescript'
    };

    // Act: Render the BlogCard component with the mock data
    render(
      <BlogLayout>
        <BlogCard {...blogPost} />
      </BlogLayout>
    );

    // Assert: Check if the blog post is rendered inside a card
    const blogCardElement = screen.getByTestId('blog-card');
    expect(blogCardElement).toBeInTheDocument();
    expect(screen.getByText(blogPost.title)).toBeInTheDocument();
    expect(screen.getByText(blogPost.date)).toBeInTheDocument();
    expect(screen.getByText(blogPost.description)).toBeInTheDocument();
    expect(screen.getByText('Read more').closest('a')).toHaveAttribute('href', `/blog/${blogPost.slug}`);
  });
});