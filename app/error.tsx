"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-responsive flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-base-content/60 text-sm font-semibold tracking-[0.3em] uppercase">
        Error
      </p>
      <h1 className="font-heading text-3xl font-bold md:text-4xl">
        Something went wrong
      </h1>
      <p className="text-base-content/80 max-w-md">
        The page failed to load. Try again, or head back home.
      </p>
      {error.digest && (
        <p className="text-base-content/50 text-xs">
          Reference: {error.digest}
        </p>
      )}
      <button type="button" onClick={reset} className="btn btn-primary">
        Try again
      </button>
    </div>
  );
}
