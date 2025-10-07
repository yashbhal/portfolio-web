// components/CardSection.tsx
import { Project, Experience } from "../Work/workData";

interface SectionProps {
  title: string;
  projects?: Project[];
  experiences?: Experience[];
}

const Section: React.FC<SectionProps> = ({ title, projects, experiences }) => {
  const isProjects = Array.isArray(projects);

  return (
    <section className="w-full space-y-6 md:space-y-8">
      <header className="space-y-2 text-base-content">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/60">
          {isProjects ? "Selected work" : "Career timeline"}
        </span>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold">{title}</h2>
        <p className="max-w-xl text-sm md:text-base text-base-content/65">
          {isProjects
            ? "Quick snapshots of products and experiments I’ve crafted recently."
            : "A tidy view of teams, roles, and outcomes from the past few years."}
        </p>
      </header>

      {projects && (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-base-100 via-base-100/80 to-transparent md:block" />
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-smooth md:mx-0 md:px-0 md:justify-center">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative flex min-w-[88%] max-w-sm snap-center flex-col gap-3.5 rounded-xl border border-base-content/10 bg-base-200/60 p-4 backdrop-blur transition hover:-translate-y-1 hover:border-base-content/20 hover:bg-base-200/70 sm:min-w-[320px] md:min-w-[300px] lg:min-w-[340px] md:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-heading font-semibold text-base-content">
                    {project.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-base-content/50">
                    {project.id.toString().padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-base-content/70">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li
                      key={`${project.id}-${tech}`}
                      className="rounded-full border border-base-content/10 px-2.5 py-1 text-[11px] font-medium text-base-content/60"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-primary transition hover:text-primary/75"
                >
                  View project
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          </div>
        </div>
      )}

      {experiences && (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-base-100 via-base-100/80 to-transparent md:block" />
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-smooth md:mx-0 md:px-0 md:justify-center">
            {experiences.map((experience) => (
              <article
                key={experience.id}
                className="group relative flex min-w-[88%] max-w-sm snap-center flex-col gap-3.5 rounded-xl border border-base-content/10 bg-base-200/60 p-4 backdrop-blur transition hover:-translate-y-1 hover:border-base-content/20 hover:bg-base-200/70 sm:min-w-[320px] md:min-w-[320px] lg:min-w-[360px] md:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-heading font-semibold text-base-content">
                    {experience.company}
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-base-content/50">
                    {experience.startDate} — {experience.endDate || "Present"}
                  </span>
                </div>
                {experience.role && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                    {experience.role}
                  </p>
                )}
                <p className="text-[13px] leading-relaxed text-base-content/70">
                  {experience.description}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {experience.technologies.map((tech) => (
                    <li
                      key={`${experience.id}-${tech}`}
                      className="rounded-full border border-base-content/10 px-2.5 py-1 text-[11px] font-medium text-base-content/60"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <a
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-primary transition hover:text-primary/75"
                >
                  View role
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          </div>
        </div>
      )}
    </section>
  );
};

export default Section;
