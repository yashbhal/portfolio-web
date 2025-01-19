// components/GlassCard.tsx
interface CardProps {
  title?: string;
  company?: string;
  description: string;
  technologies?: string[];
  imageUrl?: string;
  link: string;
  isProject: boolean;
  startDate?: string;
  endDate?: string;
}

const GlassCard: React.FC<CardProps> = ({
  title,
  company,
  description,
  technologies = [],
  link,
  isProject,
  startDate,
  endDate,
}) => (
  <div className="card bg-base-200 hover:bg-base-300 transition-all duration-300 group">
    <div className="card-body">
      {/* Header */}
      <div className="mb-4">
        {isProject ? (
          <h3 className="card-title font-heading text-xl text-base-content">
            {title}
          </h3>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl text-base-content">
                {company}
              </h3>
              {startDate && (
                <span className="text-sm text-base-content/60">
                  {startDate} — {endDate || "Present"}
                </span>
              )}
            </div>
            <p className="text-base-content/70">{title}</p>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-base-content/70 mb-6">{description}</p>

      {/* Technologies */}
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-md bg-base-300 text-base-content/70"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Action */}
      <div className="card-actions justify-end mt-auto">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline border-base-content/20 
                   hover:bg-base-content hover:text-base-100
                   transition-all duration-300"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-1"
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
      </div>
    </div>
  </div>
);

export default GlassCard;
