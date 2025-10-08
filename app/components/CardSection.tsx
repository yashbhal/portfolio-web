// components/CardSection.tsx
import { Project, Experience } from "../Work/workData";

interface SectionProps {
  title: string;
  projects?: Project[];
  experiences?: Experience[];
}

const formatDate = (value?: string) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (/present/i.test(trimmed)) {
    return "Present";
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(parsed);
  }

  return trimmed;
};

const formatDateRange = (startDate: string, endDate?: string) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate) || "Present";
  return `${start} — ${end}`;
};

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
            ? "Quick snapshots of stuff I've made."
            : "A tidy view of teams, roles, and outcomes from the past few years."}
        </p>
      </header>

      {projects && (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-base-100 via-base-100/80 to-transparent md:block" />
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-smooth md:mx-0 md:px-0">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative flex min-w-[88%] max-w-md snap-start flex-col gap-4 rounded-xl border border-base-content/10 bg-base-200/60 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-base-content/20 hover:bg-base-200/70 sm:min-w-[340px] md:min-w-[340px] lg:min-w-[380px] md:p-6 min-h-[340px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-heading font-semibold text-base-content">
                    {project.title}
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-base-content/70">
                  {project.description}
                </p>
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
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-smooth md:mx-0 md:px-0">
            {experiences.map((experience) => (
              <article
                key={experience.id}
                className="group relative flex min-w-[88%] max-w-md snap-start flex-col gap-4 rounded-xl border border-base-content/10 bg-base-200/60 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-base-content/20 hover:bg-base-200/70 sm:min-w-[340px] md:min-w-[360px] lg:min-w-[400px] md:p-6 min-h-[360px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-heading font-semibold text-base-content">
                    {experience.company}
                  </h3>
                  <span className="text-sm font-medium text-base-content/60 whitespace-nowrap">
                    {formatDateRange(experience.startDate, experience.endDate)}
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
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Section;
