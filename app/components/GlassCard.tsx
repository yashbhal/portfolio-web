interface CardProps {
  title?: string;
  company?: string;
  description: string;
  imageUrl: string;
  link: string;
  isProject: boolean;
  className?: string;
}

const GlassCard: React.FC<CardProps> = ({
  title,
  company,
  description,
  imageUrl,
  link,
  isProject,
  className,
}) => (
  <div className={`card glass h-full flex flex-col ${className || ""}`}>
    <figure className="relative h-48">
      <img
        src={imageUrl}
        alt={title || company}
        className="w-full h-full object-cover"
      />
    </figure>
    <div className="card-body flex-grow flex flex-col">
      <div className="h-16 mb-2">
        {" "}
        {/* Fixed height for title section */}
        <h3 className="text-xl font-heading font-semibold text-primary-content leading-tight">
          {isProject ? title : company}
        </h3>
        {!isProject && (
          <h4 className="text-lg font-heading font-medium text-primary-content/90 leading-tight mt-1">
            {title}
          </h4>
        )}
      </div>

      <div className="flex-grow">
        {" "}
        {/* Allows description to take necessary space */}
        <p className="text-base font-sans text-primary-content/80">
          {description}
        </p>
      </div>

      <div className="card-actions justify-end mt-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary font-heading"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
);

export default GlassCard;
