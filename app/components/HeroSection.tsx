// components/HeroSection.tsx
import { StoryCard } from "./StoryCard";

export const HeroSection = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-base-100 md:min-h-[90vh]">
      <div className="container-responsive">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight text-base-content">
                Hi, {`I'm`} Yash.
              </h1>
            </div>

            <p className="max-w-xl text-base md:text-lg text-base-content/80">
I build things that excite me, learning whatever is required along the way. Looking for the next problem worth obsessing over.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <a
                href="https://linkedin.com/in/yashbhal"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-base-content hover:bg-base-content hover:text-base-100"
              >
                Connect on LinkedIn
              </a>
              <a
                href="mailto:yashbhal@gatech.edu"
                className="btn btn-outline text-base-content hover:bg-base-content hover:text-base-100"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Story Card */}
          <div className="flex justify-center md:justify-end">
            <div className="w-72 md:w-80">
              <StoryCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
