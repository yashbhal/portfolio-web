// components/CardSection.tsx
import GlassCard from "./GlassCard";
interface SectionProps {
  title: string;
  items: {
    id: number;
    title?: string;
    company?: string;
    description: string;
    technologies?: string[];
    imageUrl?: string;
    link: string;
    startDate?: string;
    endDate?: string;
  }[];
  isProject: boolean;
}

const Section: React.FC<SectionProps> = ({ title, items, isProject }) => (
  <section className="w-full">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-12 text-center">
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
      {items.map((item) => (
        <GlassCard key={item.id} {...item} isProject={isProject} />
      ))}
    </div>
  </section>
);

export default Section;
