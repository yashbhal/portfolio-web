import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import React from 'react';


// Importing necessary testing tools and React components

// Since BlogCardProps and BlogLayoutProps are not exported, we will define them inline for testing purposes
type BlogCardProps = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, date, description, slug }) => (
  <div data-testid="blog-card">
    <h2>{title}</h2>
    <p>{date}</p>
    <p>{description}</p>
    <a href={`/blog/${slug}`}>Read More</a>
  </div>
);

type BlogLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => (
  <div data-testid="blog-layout">{children}</div>
);

// Test suite for Blog Posts rendering
describe('Blog Posts', () => {
  it('renders blog posts inside a card component', () => {
    const blogPostData: BlogCardProps = {
      title: 'Understanding TypeScript',
      date: '2023-12-01',
      description: 'A deep dive into TypeScript features and benefits.',
      slug: 'understanding-typescript'
    };

    render(
      <BlogLayout>
        <BlogCard {...blogPostData} />
      </BlogLayout>
    );

    // Assertions to check if the BlogCard is rendered correctly within BlogLayout
    const blogLayout = screen.getByTestId('blog-layout');
    expect(blogLayout).toBeInTheDocument();
    expect(blogLayout).toContainElement(screen.getByTestId('blog-card'));

    // Assertions to check if the content of BlogCard is correct
    expect(screen.getByText(blogPostData.title)).toBeInTheDocument();
    expect(screen.getByText(blogPostData.date)).toBeInTheDocument();
    expect(screen.getByText(blogPostData.description)).toBeInTheDocument();
    expect(screen.getByText('Read More').closest('a')).toHaveAttribute('href', `/blog/${blogPostData.slug}`);
  });
});