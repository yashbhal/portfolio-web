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
    <div className="card-body flex-grow">
      <h3 className="text-xl font-semibold text-primary-content">
        {isProject ? title : company}
      </h3>
      {!isProject && (
        <h4 className="text-lg font-medium text-primary-content/90">{title}</h4>
      )}
      <p className="text-base text-primary-content/80 whitespace-pre-wrap">
        {description}
      </p>
      <div className="card-actions justify-end mt-auto pt-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
);

export default GlassCard;
