import GlassCard from "./GlassCard";

interface SectionProps {
  title: string;
  items: {
    id: number;
    title?: string;
    company?: string;
    description: string;
    imageUrl: string;
    link: string;
  }[];
  isProject: boolean;
}

const Section: React.FC<SectionProps> = ({ title, items, isProject }) => (
  <section className="w-full max-w-5xl mb-8">
    <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <GlassCard key={item.id} {...item} isProject={isProject} />
      ))}
    </div>
  </section>
);

export default Section;