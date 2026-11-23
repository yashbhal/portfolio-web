// components/HeroSection.tsx
import { siteConfig } from "../lib/site";
import { StoryCard } from "./StoryCard";

export const HeroSection = () => {
  return (
    <section className="bg-base-100 flex min-h-[80vh] items-center justify-center md:min-h-[90vh]">
      <div className="container-responsive">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="font-heading text-base-content text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                Hi, {`I'm`} Yash.
              </h1>
            </div>

            <p className="text-base-content/80 max-w-xl text-base md:text-lg">
              I like to work on hard problems and build things that spark
              excitement for me and the people who use them. Always looking for
              the next problem worth obsessing over.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-base-content hover:bg-base-content hover:text-base-100"
              >
                Connect on LinkedIn
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
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
