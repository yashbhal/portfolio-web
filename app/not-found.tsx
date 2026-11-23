import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="container-responsive flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-base-content/60 text-sm font-semibold tracking-[0.3em] uppercase">
        404
      </p>
      <h1 className="font-heading text-3xl font-bold md:text-4xl">
        This page does not exist
      </h1>
      <p className="text-base-content/80 max-w-md">
        The link may be out of date. The home page and the blog are still here.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Go home
        </Link>
        <Link href="/blog" className="btn btn-outline">
          Read the blog
        </Link>
      </div>
    </div>
  );
}
