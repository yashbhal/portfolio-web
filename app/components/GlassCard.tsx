import Link from "next/link";
import Image from "next/image";

interface CardProps {
  title?: string;
  company?: string;
  description: string;
  imageUrl: string;
  link: string;
  isProject: boolean;
}

const GlassCard: React.FC<CardProps> = ({
  title,
  company,
  description,
  imageUrl,
  link,
  isProject,
}) => (
  <div className="card glass w-full">
    <figure>
      <Image
        src={imageUrl}
        alt={title || company || "Image"}
        width={400}
        height={300}
        className="object-cover w-full"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title || company || "Untitled"}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        <Link href={link}>
          <button className="btn btn-primary">
            {isProject ? "View Project" : "View Company"}
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default GlassCard;
