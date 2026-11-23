"use client";

import { ReactNode, useRef } from "react";
import { formatDateRange } from "../lib/date";
import { Project, Experience } from "../work/workData";

interface SectionProps {
  title: string;
  projects?: Project[];
  experiences?: Experience[];
  action?: ReactNode;
}

interface CarouselProps {
  label: string;
  children: ReactNode;
}

const Carousel = ({ label, children }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = container.offsetWidth * 0.85;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative pb-12">
      <div className="from-base-100 via-base-100/80 pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r to-transparent md:block" />
      <div className="from-base-100 via-base-100/80 pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l to-transparent md:block" />
      <div
        ref={scrollRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 md:mx-0 md:px-0"
      >
        {children}
      </div>
      <div className="absolute right-4 bottom-4 flex gap-2">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="btn btn-outline btn-sm"
          aria-label={`Scroll ${label} left`}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="btn btn-outline btn-sm"
          aria-label={`Scroll ${label} right`}
        >
          ›
        </button>
      </div>
    </div>
  );
};

const Section: React.FC<SectionProps> = ({
  title,
  projects,
  experiences,
  action,
}) => {
  return (
    <section className="w-full space-y-6 md:space-y-8">
      <header className="text-base-content flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-2xl font-semibold md:text-3xl">
          {title}
        </h2>
        {action}
      </header>

      {projects && (
        <Carousel label="projects">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group border-base-content/10 bg-base-200/60 hover:border-base-content/20 hover:bg-base-200/70 relative flex max-w-md min-w-[88%] snap-start flex-col gap-4 rounded-xl border p-5 backdrop-blur transition hover:-translate-y-1 sm:min-w-[340px] md:min-w-[340px] md:p-6 lg:min-w-[380px]"
            >
              <div className="flex min-h-[64px] items-start justify-between gap-3">
                <h3 className="font-heading text-base-content line-clamp-2 text-lg font-semibold">
                  {project.title}
                </h3>
              </div>
              <p className="text-base-content/70 line-clamp-4 flex-1 text-[13px] leading-relaxed">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/75 mt-auto inline-flex items-center gap-2 text-[13px] font-semibold transition"
              >
                View project
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </article>
          ))}
        </Carousel>
      )}

      {experiences && (
        <Carousel label="experiences">
          {experiences.map((experience) => (
            <article
              key={experience.id}
              className="group border-base-content/10 bg-base-200/60 hover:border-base-content/20 hover:bg-base-200/70 relative flex max-w-md min-w-[88%] snap-start flex-col gap-4 rounded-xl border p-5 backdrop-blur transition hover:-translate-y-1 sm:min-w-[340px] md:min-w-[360px] md:p-6 lg:min-w-[400px]"
            >
              <div className="flex min-h-[64px] flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-3">
                <h3 className="font-heading text-base-content line-clamp-2 text-lg font-semibold">
                  {experience.company}
                </h3>
                <span className="text-base-content/60 text-xs font-medium md:text-sm md:whitespace-nowrap">
                  {formatDateRange(experience.startDate, experience.endDate)}
                </span>
              </div>
              <div className="flex min-h-[24px] items-center">
                {experience.role && (
                  <p className="text-primary/70 line-clamp-1 text-xs font-semibold tracking-wide uppercase">
                    {experience.role}
                  </p>
                )}
              </div>
              <p className="text-base-content/70 line-clamp-5 flex-1 text-[13px] leading-relaxed">
                {experience.description}
              </p>
            </article>
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default Section;
